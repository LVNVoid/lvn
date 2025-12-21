import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { deleteFromCloudinary } from '@/lib/cloudinary'

export async function GET() {
  try {
    // Assuming the first profile is the main one
    const profile = await prisma.profile.findFirst()
    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()
    // Update the first profile found, or create if none
    const firstProfile = await prisma.profile.findFirst()
    
    let profile
    if (firstProfile) {
      profile = await prisma.profile.update({
        where: { id: firstProfile.id },
        data: {
          name: data.name,
          role: data.role,
          bio: data.bio,
          location: data.location,
          email: data.email,
          avatar: data.avatar,
          socials: data.socials, // JSON object
        },
      })
      
      // If avatar has changed, delete old one
      if (data.avatar !== firstProfile.avatar && firstProfile.avatar) {
        await deleteFromCloudinary(firstProfile.avatar)
      }
    } else {
       // Only if no profile exists
       profile = await prisma.profile.create({
        data: {
          name: data.name,
          role: data.role,
          bio: data.bio,
          location: data.location,
          email: data.email,
          avatar: data.avatar,
          socials: data.socials,
        }
       })
    }
    
    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
