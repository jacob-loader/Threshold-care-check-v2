import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        lovedOnes: true,
      },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    const formattedLovedOnes = user.lovedOnes.map((lo) => ({
      id: lo.id,
      name: lo.name,
      phoneNumber: lo.phoneNumber,
      dateOfBirth: lo.dateOfBirth,
      createdAt: lo.createdAt,
    }))

    return NextResponse.json(formattedLovedOnes)
  } catch (error) {
    console.error('Error fetching loved ones:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    const body = await request.json()
    const { name, phoneNumber } = body

    if (!name || !phoneNumber) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const data: Prisma.LovedOneUncheckedCreateInput = {
      name,
      phoneNumber,
      userId: user.id,
    }

    const lovedOne = await prisma.lovedOne.create({
      data,
    })

    return NextResponse.json(lovedOne)
  } catch (error) {
    console.error('Error creating loved one:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 