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
  } catch (e) {
    console.error('Error seeding Admin:', e)
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
