import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(certificates)
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

    const certificate = await prisma.certificate.create({
      data: {
        name: data.name,
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
