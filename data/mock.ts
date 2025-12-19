export const profile = {
  name: "Elvien",
  role: "Full Stack Developer",
  bio: "Passionate developer building modern web applications with a focus on user experience and clean code.",
  location: "Jakarta, Indonesia",
  email: "elvien.purnawan13@gmail.com",
  avatar: "/images/profile.jpg",
  socials: {
    github: "https://github.com/lvnvoid",
    linkedin: "https://linkedin.com/in/elvien",
    twitter: "https://twitter.com/elvien",
  },
};

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "GraphQL",
  "Docker",
  "AWS",
];

export const education = [
 {
  "school": "Universitas Muhammadiyah Magelang",
  "degree": "Bachelor of Informatics Engineering",
  "year": "2020 - 2025",
  "description": "Completed a Bachelor's degree in Informatics Engineering with a focus on software development, web technologies, and problem-solving."
}

];

export const certificates = [
  {
    name: "Belajar Back-End Pemula dengan JavaScript",
    issuer: "Dicoding",
    date: "2024",
    url: "https://www.dicoding.com/certificates/53XEO5V0YZRN",
    image: "/images/certificates/Belajar Back-End Pemula dengan JavaScript.jpg",
  },
  {
    name: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding",
    date: "2023",
    url: "https://www.dicoding.com/certificates/JMZV1OG7RXN9",
    image: "/images/certificates/Belajar Dasar Pemrograman JavaScript.jpg",
  },
  {
    name: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding",
    date: "2023",
    url: "https://www.dicoding.com/certificates/EYX4YK75OZDL",
    image: "/images/certificates/Belajar Dasar Pemrograman Web.jpg",
  },
  {
    name: "Belajar Dasar Git dengan GitHub",
    issuer: "Dicoding",
    date: "2024",
    url: "https://www.dicoding.com/certificates/QLZ94EYLMP5D",
    image: "/images/certificates/Belajar Dasar Git dengan GitHub.jpg",
  },
  {
    name: "Belajar Membuat Aplikasi Web dengan React",
    issuer: "Dicoding",
    date: "2023",
    url: "https://www.dicoding.com/certificates/QLZ9RE069P5D",
    image: "/images/certificates/Belajar Membuat Aplikasi Web dengan React.jpg",
  },
];

export const projects = [
  {
    title: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for managing online stores, featuring real-time analytics and inventory management.",
    tech: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    link: "#",
    github: "#",
  },
  {
    title: "Task Management App",
    description: "Collaborative task manager with real-time updates using WebSockets.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    link: "#",
    github: "#",
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website built with Next.js and animated components.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "#",
    github: "#",
  },
];

export const mockGithubStats = {
  followers: 120,
  following: 45,
  public_repos: 32,
  total_stars: 250,
  total_contributions: 1450,
};

export const mockRecentActivity = [
  {
    id: 1,
    type: "PushEvent",
    repo: { name: "elvien/portfolio" },
    created_at: "2023-12-18T10:00:00Z",
    payload: { commits: [{ message: "Initial commit" }] },
  },
  {
    id: 2,
    type: "CreateEvent",
    repo: { name: "elvien/next-starter" },
    created_at: "2023-12-17T15:30:00Z",
    payload: {},
  },
  {
    id: 3,
    type: "WatchEvent",
    repo: { name: "facebook/react" },
    created_at: "2023-12-16T09:15:00Z",
    payload: {},
  },
];
