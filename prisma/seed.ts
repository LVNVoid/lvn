import 'dotenv/config'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('Start seeding ...')

  try {
    const email = 'elvien.purnawan13@gmail.com'
    const password = 'password123'
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        password: hashedPassword,
        role: 'ADMIN',
      },
    })
    console.log(`Seeded Admin: ${user.email}`)

    const kopiSangkara = await prisma.project.upsert({
      where: { slug: 'kopi-sangkara-pos' },
      update: {
        title: 'Kopi Sangkara POS',
        description: `Kopi Sangkara POS is a modern, responsive cloud-based Point of Sale and retail operations platform tailored for specialty coffee shops and hospitality environments. Engineered as an installable Progressive Web Application (PWA) optimized for tablet and iPad touch viewports, the system streamlines fast-paced order workflows while maintaining strict financial integrity.

### Architectural Overview

Built with Next.js 16 App Router on top of a kebab-case Hybrid Modular architecture, the platform strictly isolates business logic and transaction processing from presentational components. The database layer utilizes Prisma ORM connected to serverless PostgreSQL (Neon) with connection pooling and Zero-any TypeScript type contracts.

### Key Capabilities & Features

- **Direct ESC/POS Hardware Printing:** Native browser-to-hardware communication generating raw ESC/POS bytecode over Web Bluetooth for 58mm thermal printers with dynamic QR-based digital invoice fallback.
- **Cashier Shift Reconciliation:** Complete shift management lifecycle tracking opening float, expected cash balance, physical cash count, and real-time audit logs for cash discrepancies.
- **Sales & Analytics Intelligence:** Visualized performance telemetry and sales trend charts tracking Total Penjualan, product category popularity, and peak order hours.
- **Enterprise Security & PWA Readiness:** Role-based access control (Admin/Cashier), zero credential data leaks, and service worker caching delivering immediate offline resilience.`,
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Web Bluetooth', 'PWA'],
        link: 'https://kopi-sangkara-pos.vercel.app',
        github: 'https://github.com/LVNVoid/kopi-sangkara-pos',
        image: '/projects/kopi-sangkara-pos.png',
      },
      create: {
        title: 'Kopi Sangkara POS',
        slug: 'kopi-sangkara-pos',
        description: `Kopi Sangkara POS is a modern, responsive cloud-based Point of Sale and retail operations platform tailored for specialty coffee shops and hospitality environments. Engineered as an installable Progressive Web Application (PWA) optimized for tablet and iPad touch viewports, the system streamlines fast-paced order workflows while maintaining strict financial integrity.

### Architectural Overview

Built with Next.js 16 App Router on top of a kebab-case Hybrid Modular architecture, the platform strictly isolates business logic and transaction processing from presentational components. The database layer utilizes Prisma ORM connected to serverless PostgreSQL (Neon) with connection pooling and Zero-any TypeScript type contracts.

### Key Capabilities & Features

- **Direct ESC/POS Hardware Printing:** Native browser-to-hardware communication generating raw ESC/POS bytecode over Web Bluetooth for 58mm thermal printers with dynamic QR-based digital invoice fallback.
- **Cashier Shift Reconciliation:** Complete shift management lifecycle tracking opening float, expected cash balance, physical cash count, and real-time audit logs for cash discrepancies.
- **Sales & Analytics Intelligence:** Visualized performance telemetry and sales trend charts tracking Total Penjualan, product category popularity, and peak order hours.
- **Enterprise Security & PWA Readiness:** Role-based access control (Admin/Cashier), zero credential data leaks, and service worker caching delivering immediate offline resilience.`,
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Web Bluetooth', 'PWA'],
        link: 'https://kopi-sangkara-pos.vercel.app',
        github: 'https://github.com/LVNVoid/kopi-sangkara-pos',
        image: '/projects/kopi-sangkara-pos.png',
      },
    })
    console.log(`Seeded Project: ${kopiSangkara.title}`)

    const maganghubBot = await prisma.project.upsert({
      where: { slug: 'maganghub-bot-attendance' },
      update: {
        title: 'MagangHub Bot Attendance',
        description: `MagangHub Bot Attendance & Automated Daily Reporting Platform is an enterprise-grade multi-user workflow automation and attendance management system engineered for Indonesian Ministry of Manpower (Kemnaker) MagangHub interns. The platform completely automates daily check-in, check-out, and formal tri-part internship activity reporting (Uraian, Pembelajaran, Kendala) via intelligent proxy routing and background cron daemon execution.

### Architectural Overview

Built with Next.js 16 App Router following the Simple Scalable Architecture, the application leverages NextAuth (Auth.js v5) with OAuth and Personal Access Token (PAT) authentication, serverless PostgreSQL (Neon) via Prisma ORM, and Tailwind CSS mobile-first responsive interfaces complying with strict touch target and anti-zoom ergonomics.

### Key Capabilities & Features

- **Cloudflare WAF Forward Proxy Bypass:** Transparent HTTP CONNECT forward proxy architecture routing outbound requests through dedicated VPS infrastructure to seamlessly bypass Kemnaker SSO datacenter IP blocks.
- **AI-Driven Multi-Source Daily Reporting:** Real-time synchronization of developer commits via GitHub REST API and public Atom feed fallback, generating structured, context-rich daily logs compliant with Kemnaker standards.
- **Automated Cron Daemon Execution:** Robust serverless cron trigger architecture integrated with VPS Crontab and Asia/Jakarta (WIB) timezone alignment for scheduled automated submission and notification dispatch.
- **Mobile-First Responsive Experience:** Touch-optimized stacked card views, modal activity inspectors, and protected report locking preventing accidental edits to submitted filings.`,
        tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Neon', 'NextAuth', 'Zod', 'Tinyproxy', 'Vitest'],
        link: 'https://maganghub-bot-attendance.vercel.app',
        github: 'https://github.com/LVNVoid/maganghub-bot-attendance',
        image: 'https://res.cloudinary.com/dmvludl4w/image/upload/v1789998667/projects/bybb9teoo7iyrzgcmio5.png',
      },
      create: {
        title: 'MagangHub Bot Attendance',
        slug: 'maganghub-bot-attendance',
        description: `MagangHub Bot Attendance & Automated Daily Reporting Platform is an enterprise-grade multi-user workflow automation and attendance management system engineered for Indonesian Ministry of Manpower (Kemnaker) MagangHub interns. The platform completely automates daily check-in, check-out, and formal tri-part internship activity reporting (Uraian, Pembelajaran, Kendala) via intelligent proxy routing and background cron daemon execution.

### Architectural Overview

Built with Next.js 16 App Router following the Simple Scalable Architecture, the application leverages NextAuth (Auth.js v5) with OAuth and Personal Access Token (PAT) authentication, serverless PostgreSQL (Neon) via Prisma ORM, and Tailwind CSS mobile-first responsive interfaces complying with strict touch target and anti-zoom ergonomics.

### Key Capabilities & Features

- **Cloudflare WAF Forward Proxy Bypass:** Transparent HTTP CONNECT forward proxy architecture routing outbound requests through dedicated VPS infrastructure to seamlessly bypass Kemnaker SSO datacenter IP blocks.
- **AI-Driven Multi-Source Daily Reporting:** Real-time synchronization of developer commits via GitHub REST API and public Atom feed fallback, generating structured, context-rich daily logs compliant with Kemnaker standards.
- **Automated Cron Daemon Execution:** Robust serverless cron trigger architecture integrated with VPS Crontab and Asia/Jakarta (WIB) timezone alignment for scheduled automated submission and notification dispatch.
- **Mobile-First Responsive Experience:** Touch-optimized stacked card views, modal activity inspectors, and protected report locking preventing accidental edits to submitted filings.`,
        tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Neon', 'NextAuth', 'Zod', 'Tinyproxy', 'Vitest'],
        link: 'https://maganghub-bot-attendance.vercel.app',
        github: 'https://github.com/LVNVoid/maganghub-bot-attendance',
        image: 'https://res.cloudinary.com/dmvludl4w/image/upload/v1789998667/projects/bybb9teoo7iyrzgcmio5.png',
      },
    })
    console.log(`Seeded Project: ${maganghubBot.title}`)
  } catch (e) {
    console.error('Error seeding database:', e)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
