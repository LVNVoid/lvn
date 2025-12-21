import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(education)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()

    if (!data.school || !data.degree || !data.year) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const education = await prisma.education.create({
      data: {
        school: data.school,
        degree: data.degree,
        year: data.year,
        description: data.description || null,
      },
    })
    return NextResponse.json(education)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create education' }, { status: 500 })
  }
}
