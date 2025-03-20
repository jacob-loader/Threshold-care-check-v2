import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { CheckInStatus } from '@prisma/client'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const checkIn = await prisma.checkIn.findUnique({
      where: { id: params.id },
      include: {
        lovedOne: true,
      },
    })

    if (!checkIn) {
      return new NextResponse('Check-in not found', { status: 404 })
    }

    // Verify that the check-in belongs to one of the user's loved ones
    const isAuthorized = user.lovedOnes.some((lo) => lo.id === checkIn.lovedOneId)
    if (!isAuthorized) {
      return new NextResponse('Not authorized to mark this check-in as missed', {
        status: 403,
      })
    }

    const body = await request.json()
    const { reason } = body

    const updatedCheckIn = await prisma.checkIn.update({
      where: { id: params.id },
      data: {
        status: CheckInStatus.MISSED,
        missedReason: reason,
      },
    })

    return NextResponse.json(updatedCheckIn)
  } catch (error) {
    console.error('Error marking check-in as missed:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 