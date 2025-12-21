import 'dotenv/config'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { profile, projects, skills, education, certificates } from '../data/mock'

async function main() {
  console.log('Start seeding ...')

  // 1. Seed Admin User
  try {
    const email = 'admin@example.com'
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
  } catch (e) {
    console.error('Error seeding Admin:', e)
  }

  // 2. Clean up Portfolio Data
  try {
    // Delete in reverse order of dependencies if needed, 
    // though here loose relations allow this.
    // Using deleteMany for safety in development (TRUNCATE can be locked or restrictive)
    await prisma.certificate.deleteMany()
    await prisma.education.deleteMany()
    await prisma.project.deleteMany()
    await prisma.skill.deleteMany()
    // For profile, we might update or recreate. Let's delete to be fresh.
    await prisma.profile.deleteMany()
    console.log('Cleaned up existing portfolio data')
  } catch (e) {
    console.warn("Cleanup warning:", e)
  }

  // 3. Seed Profile
  try {
    const socialLinks = profile.socials ? JSON.parse(JSON.stringify(profile.socials)) : undefined
    await prisma.profile.create({
      data: {
        name: profile.name,
        role: profile.role,
        bio: profile.bio,
        location: profile.location,
        email: profile.email,
        avatar: profile.avatar,
        socials: socialLinks,
      },
    })
    console.log('Seeded Profile')
  } catch (e) { console.error("Error seeding Profile:", e) }

  // 4. Seed Skills
  try {
    for (const skillName of skills) {
      await prisma.skill.create({
        data: { name: skillName },
      })
    }
    console.log(`Seeded ${skills.length} Skills`)
  } catch (e) { console.error("Error seeding Skills:", e) }

  // 5. Seed Projects
  try {
    for (const project of projects) {
      await prisma.project.create({
        data: {
          title: project.title,
          description: project.description,
          tech: project.tech,
          link: project.link,
          github: project.github,
        },
      })
    }
    console.log(`Seeded ${projects.length} Projects`)
  } catch (e) { console.error("Error seeding Projects:", e) }

  // 6. Seed Education
  try {
    for (const edu of education) {
      await prisma.education.create({
        data: {
          school: edu.school,
          degree: edu.degree,
          year: edu.year,
          description: edu.description,
        },
      })
    }
    console.log(`Seeded ${education.length} Education items`)
  } catch (e) { console.error("Error seeding Education:", e) }

  // 7. Seed Certificates
  try {
    for (const cert of certificates) {
      await prisma.certificate.create({
        data: {
          name: cert.name,
          issuer: cert.issuer,
          date: cert.date,
          url: cert.url,
          image: cert.image,
        },
      })
    }
    console.log(`Seeded ${certificates.length} Certificates`)
  } catch (e) { console.error("Error seeding Certificates:", e) }

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
