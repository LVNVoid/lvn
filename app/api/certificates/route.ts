import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { slugify } from '@/lib/utils'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [certificates, total] = await Promise.all([
      prisma.certificate.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.certificate.count(),
    ])

    return NextResponse.json({
      data: certificates,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()
    console.log("Certificate POST payload:", data);

    if (!data.name || !data.issuer || !data.date) {
      console.error("Missing required fields:", data);
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const slug = slugify(data.name)

    const certificate = await prisma.certificate.create({
      data: {
        name: data.name,
        slug,
        issuer: data.issuer,
        date: data.date,
        url: data.url || null,
        image: data.image || null,
      },
    })
    console.log("Certificate created:", certificate);
    return NextResponse.json(certificate)
  } catch (error: any) {
    console.error("Certificate creation error:", error);
    return NextResponse.json({ error: error.message || 'Failed to create certificate' }, { status: 500 })
  }
}
