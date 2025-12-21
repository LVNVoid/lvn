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
