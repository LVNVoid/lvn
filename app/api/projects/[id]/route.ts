import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { deleteFromCloudinary } from '@/lib/cloudinary'

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()
    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        tech: data.tech,
        link: data.link,
        github: data.github,
        image: data.image,
      },
    })
    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    })

    if (project?.image) {
      await deleteFromCloudinary(project.image)
    }

    await prisma.project.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'Project deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
