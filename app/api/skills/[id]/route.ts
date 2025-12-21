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
    await prisma.skill.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'Skill deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 })
  }
}
