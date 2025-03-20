import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { CheckInStatus } from '@prisma/client'

export async function GET() {
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

    const now = new Date()
    const lovedOneIds = user.lovedOnes.map((lo) => lo.id)
    const lovedOneNames = user.lovedOnes.reduce((acc, lo) => {
      acc[lo.id] = lo.name
      return acc
    }, {} as Record<string, string>)

    const upcomingCheckIns = await prisma.checkIn.findMany({
      where: {
        lovedOneId: {
          in: lovedOneIds,
        },
        status: CheckInStatus.PENDING,
        createdAt: {
          gte: now,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: 10,
    })

    const formattedCheckIns = upcomingCheckIns.map((checkIn) => ({
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
    console.error('Error fetching upcoming check-ins:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 