import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await prisma.education.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'Education deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete education' }, { status: 500 })
  }
}
