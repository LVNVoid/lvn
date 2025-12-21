import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(skills)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()

    if (!data.name) {
       return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const skill = await prisma.skill.create({
      data: {
        name: data.name,
        category: data.category || null,
      },
    })
    return NextResponse.json(skill)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}
