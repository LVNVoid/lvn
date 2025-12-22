import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { deleteFromCloudinary } from '@/lib/cloudinary'

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const certificate = await prisma.certificate.findUnique({
      where: { id: params.id },
    })

    if (certificate?.image) {
      await deleteFromCloudinary(certificate.image)
    }

    await prisma.certificate.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'Certificate deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 })
  }
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()

    const certificate = await prisma.certificate.update({
      where: { id: params.id },
      data: {
        name: data.name,
        issuer: data.issuer,
        date: data.date,
        url: data.url,
        image: data.image,
      },
    })
    return NextResponse.json(certificate)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update certificate' }, { status: 500 })
  }
}
