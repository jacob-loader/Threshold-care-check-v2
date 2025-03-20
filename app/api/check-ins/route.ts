import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { CheckInStatus } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        lovedOnes: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    const body = await request.json()
    const { lovedOneId, scheduledFor, location, latitude, longitude } = body

    if (!lovedOneId || !scheduledFor) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    // Verify that the loved one belongs to the user
    const isAuthorized = user.lovedOnes.some((lo) => lo.id === lovedOneId)
    if (!isAuthorized) {
      return new NextResponse('Not authorized to create check-in for this loved one', {
        status: 403,
      })
    }

    const checkIn = await prisma.checkIn.create({
      data: {
        lovedOneId,
        scheduledFor: new Date(scheduledFor),
        status: CheckInStatus.PENDING,
        location,
        latitude,
        longitude,
      },
    })

    return NextResponse.json(checkIn)
  } catch (error) {
    console.error('Error creating check-in:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        lovedOnes: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    const lovedOneIds = user.lovedOnes.map((lo) => lo.id)
    const lovedOneNames = user.lovedOnes.reduce((acc, lo) => {
      acc[lo.id] = lo.name
      return acc
    }, {} as Record<string, string>)

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as CheckInStatus | null
    const lovedOneId = searchParams.get('lovedOneId')

    const checkIns = await prisma.checkIn.findMany({
      where: {
        lovedOneId: lovedOneId ? lovedOneId : { in: lovedOneIds },
        ...(status && { status }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    })

    const formattedCheckIns = checkIns.map((checkIn) => ({
      id: checkIn.id,
      status: checkIn.status,
      createdAt: checkIn.createdAt,
      location: checkIn.location,
      latitude: checkIn.latitude,
      longitude: checkIn.longitude,
      lovedOneName: lovedOneNames[checkIn.lovedOneId],
    }))

    return NextResponse.json(formattedCheckIns)
  } catch (error) {
    console.error('Error fetching check-ins:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 