import 'dotenv/config'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { profile, projects, skills, education, certificates } from '../data/mock'
import { slugify } from '@/lib/utils'

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
  } catch (e) {
    console.error('Error seeding Admin:', e)
  }

  try {
    await prisma.certificate.deleteMany()
    await prisma.education.deleteMany()
    await prisma.project.deleteMany()
    await prisma.skill.deleteMany()
    await prisma.profile.deleteMany()
    console.log('Cleaned up existing portfolio data')
  } catch (e) {
    console.warn("Cleanup warning:", e)
  }

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

  try {
    for (const skillName of skills) {
      await prisma.skill.create({
        data: { name: skillName },
      })
    }
    console.log(`Seeded ${skills.length} Skills`)
  } catch (e) { console.error("Error seeding Skills:", e) }

  try {
    for (const project of projects) {
      await prisma.project.create({
        data: {
          title: project.title,
          slug: slugify(project.title),
          description: project.description,
          tech: project.tech,
          link: project.link,
          github: project.github,
        },
      })
    }
    console.log(`Seeded ${projects.length} Projects`)
  } catch (e) { console.error("Error seeding Projects:", e) }

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

  try {
    for (const cert of certificates) {
      await prisma.certificate.create({
        data: {
          name: cert.name,
          slug: slugify(cert.name),
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
