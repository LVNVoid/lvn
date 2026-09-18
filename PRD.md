# Product Requirement Document (PRD)
## Elviencode Personal Portfolio & CMS Platform (`lvn`)

---

## 1. Executive Summary & Product Vision
**Elviencode Portfolio (`lvn`)** adalah website portofolio pribadi modern dan Content Management System (CMS) mandiri milik Elvien (Software Engineer / Full Stack Developer). Platform ini berfungsi sebagai:
- **Etalase Profesional Utama**: Memamerkan karya rekayasa perangkat lunak, proyek aktif, sertifikasi kompetensi, dan latar belakang akademis.
- **Pusat Observabilitas Aktivitas**: Menampilkan aktivitas open-source nyata langsung dari GitHub (contribution graph, live recent events).
- **Admin CMS Terproteksi**: Dashboard manajemen konten terintegrasi untuk memperbarui profil, proyek, keahlian teknis (*skills*), sertifikat, dan pendidikan tanpa perlu menyentuh kode program.

Target domain: `https://elvien.net`

---

## 2. Tech Stack & Architecture

### Frontend & Core
- **Framework**: Next.js 16.0.10 (App Router, React Server Components, React Compiler enabled)
- **Library**: React 19.2.1
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`), `tailwindcss-animate`, Radix UI primitives
- **Motion & Visuals**: Framer Motion v12, GSAP v3, OGL (WebGL)
- **Theme**: `next-themes` (Dark/Light mode persistence)
- **Icons**: Lucide React, React Icons

### Backend & Persistence
- **Database**: PostgreSQL
- **ORM / Query Engine**: Prisma ORM v7.2.0 (`@prisma/adapter-pg` driver adapter + `pg` connection pool)
- **Client Output**: Custom client path `@/lib/prisma-client`
- **Authentication**: NextAuth.js v4.24.13 (Credentials Provider, JWT session strategy, bcryptjs v3)
- **File & Media Storage**: Cloudinary v2 (Stream uploads via multipart form data)

### Analytics & Observability
- **Platform Analytics**: `@vercel/analytics`, `@vercel/speed-insights`
- **Developer Metrics**: GitHub REST API integration (`/lib/github.ts`), `react-github-calendar`

---

## 3. Information Architecture & Routing

### 🌐 A. Public Routes (`app/(public)`)
| Rute | Tipe Render | Deskripsi |
| :--- | :--- | :--- |
| `/` | ISR (`revalidate: 60`) | Hero typewriter, Hire Me status, Download CV, Skills grid, 3 Featured Projects, Call to Action. |
| `/about` | Dynamic / SSR | Profil mendalam, bio, dan rekam jejak pendidikan (*Education timeline*). |
| `/projects` | ISR (`revalidate: 60`) | Katalog proyek lengkap dengan badge teknologi dan tautan live demo / GitHub. |
| `/projects/[slug]` | Dynamic / SSR | Halaman detail proyek: banner cover, deskripsi komprehensif, badge stack, CTA live site. |
| `/certificates` | Dynamic / SSR | Galeri pencapaian sertifikat dengan informasi penerbit (*issuer*) dan tanggal. |
| `/certificates/[slug]` | Dynamic / SSR | Tampilan pratinjau sertifikat resolusi penuh dan tautan verifikasi kredensial. |
| `/dashboard` | Dynamic / SSR | Dashboard analitik developer: heatmap GitHub Calendar dan feed 10 aktivitas commit/event terakhir. |
| `/contact` | Client Component | Kartu tautan sosial (GitHub, LinkedIn) dan formulir kirim pesan. |

### 🔒 B. Admin CMS Routes (`app/admin`)
*Diproteksi oleh `getServerSession(authOptions)`. Redirect otomatis ke `/auth/login` jika tidak terotentikasi.*
| Rute | Deskripsi |
| :--- | :--- |
| `/admin` | Ringkasan statistik metrik (Total Projects, Total Skills, Total Certificates, Total Education). |
| `/admin/profile` | Formulir pembaruan profil publik (Nama, Role, Bio, Lokasi, Email, Avatar Cloudinary, Socials JSON). |
| `/admin/projects` | Tabel CRUD proyek (Pencarian, tambah `/new`, edit `/[id]/edit`, hapus). |
| `/admin/certificates` | Tabel CRUD sertifikat (Paginasi, tambah `/new`, edit `/[slug]/edit`, upload berkas gambar). |
| `/admin/skills` | Tabel CRUD keahlian (Kategori, tambah `/new`, hapus). |
| `/admin/education` | Tabel CRUD riwayat pendidikan (Institusi, gelar, tahun, deskripsi). |

### 🔑 C. Auth Routes
| Rute | Deskripsi |
| :--- | :--- |
| `/auth/login` | Halaman login admin berbasis email dan password. |

---

## 4. Database Schema (Prisma Data Models)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hash
  role      String   @default("ADMIN")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Profile {
  id        String   @id @default(cuid())
  name      String
  role      String
  bio       String
  location  String
  email     String
  avatar    String   // URL Cloudinary
  socials   Json?    // { github, linkedin, twitter, instagram }
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Project {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  tech        String[] // Array nama teknologi
  link        String?  // Live demo URL
  github      String?  // Source code URL
  image       String?  // Cloudinary image URL
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Skill {
  id        String   @id @default(cuid())
  name      String   @unique
  category  String?  // Frontend, Backend, Database, Tools, dll.
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Education {
  id          String   @id @default(cuid())
  school      String
  degree      String
  year        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Certificate {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  issuer    String
  date      String
  url       String?  // Link verifikasi eksternal
  image     String?  // Scan berkas gambar
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 5. API Endpoints Specification

| Endpoint | Method | Auth Required | Fungsi |
| :--- | :--- | :---: | :--- |
| `/api/auth/[...nextauth]` | POST, GET | No | Handler sesi NextAuth JWT |
| `/api/profile` | GET | No | Mengambil profil publik aktif |
| `/api/profile` | PUT | Yes (Admin) | Update profil & auto-delete avatar lama dari Cloudinary |
| `/api/projects` | GET | No | Ambil seluruh daftar proyek |
| `/api/projects` | POST | Yes (Admin) | Tambah proyek baru (otomatis slugify title) |
| `/api/projects/[id]` | GET, PUT, DELETE | PUT/DELETE: Yes | Detail, perbarui, atau hapus proyek |
| `/api/certificates` | GET | No | Ambil daftar sertifikat berpaginasi (`page`, `limit`) |
| `/api/certificates` | POST | Yes (Admin) | Tambah sertifikat baru |
| `/api/certificates/[slug]`| GET, PUT, DELETE | PUT/DELETE: Yes | Ambil/edit/hapus sertifikat berdasarkan slug |
| `/api/skills` | GET, POST | POST: Yes | Ambil atau tambah skill baru |
| `/api/skills/[id]` | DELETE | Yes (Admin) | Hapus skill |
| `/api/education` | GET, POST | POST: Yes | Ambil atau tambah entri pendidikan |
| `/api/education/[id]` | DELETE | Yes (Admin) | Hapus entri pendidikan |
| `/api/upload` | POST | Yes (Admin) | Upload stream gambar ke Cloudinary folder spesifik |

---

## 6. Non-Functional Requirements & Security Standards

1. **Keamanan Jaringan & Header HTTP (`next.config.ts`)**:
   - Content Security Policy (CSP) ketat dengan restriksi `frame-ancestors 'none'`, `object-src 'none'`.
   - `X-Content-Type-Options: nosniff`.
   - `X-Frame-Options: DENY`.
   - `Strict-Transport-Security` (HSTS) aktif dengan durasi 1 tahun (`max-age=31536000`).
   - `X-XSS-Protection: 1; mode=block`.
2. **SEO & Metadata**:
   - Metadata statis & dinamis per halaman lengkap dengan OpenGraph dan Twitter Cards.
   - Structured Data Schema.org (`JSON-LD`) pada homepage (`Person`, `sameAs`).
   - `robots.ts` dan `sitemap.ts` otomatis dihasilkan oleh Next.js.
3. **Optimasi Kinerja & Rendering**:
   - React Compiler aktif (`reactCompiler: true`) untuk eliminasi re-render tanpa memo manual.
   - ISR (Incremental Static Regeneration) 60 detik pada homepage dan halaman proyek.
   - Remote pattern Cloudinary diizinkan di Next Image dengan optimasi WebP otomatis.
4. **UX & Responsivitas**:
   - Desktop: Sticky sidebar 72-unit dengan identitas profil terverifikasi, status bio, dan navigasi vertikal.
   - Mobile: Top navbar ramping dengan overlay menu backdrop blur dan lock scroll otomatis saat terbuka.
   - Micro-interaction: Staggered animation saat konten dimuat, efek hover kartu berskala lembut.

---

## 7. Catatan Teknis & Roadmap Peningkatan

1. **Form Kontak (`/contact`)**:
   - Saat ini masih berstatus mockup (`alert("Message sent! (This is a demo)")`).
   - *Roadmap*: Hubungkan ke provider email transaksional (Resend, Nodemailer, atau Formspree) dengan rate limiting.
2. **Autentikasi & Authorization**:
   - Admin akun dibuat via seed script (`prisma/seed.ts`).
   - Belum ada fitur reset password mandiri via email.
3. **Penyimpanan Gambar**:
   - Penghapusan gambar otomatis saat delete project/certificate masih dapat diperluas agar tidak meninggalkan aset tak terpakai (*orphan files*) di Cloudinary.
