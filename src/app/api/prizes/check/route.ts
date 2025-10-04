import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')

    if (!username) {
      return NextResponse.json(
        { error: 'Nombre de usuario es requerido' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    const winnings = await prisma.participation.findMany({
      where: {
        userId: user.id,
        isWinner: true
      },
      include: {
        raffle: {
          select: {
            title: true,
            prize: true,
            endDate: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const winningsWithStatus = winnings.map(winning => ({
      ...winning,
      claimed: Math.random() > 0.5
    }))

    return NextResponse.json({
      user: {
        username: user.username,
        email: user.email
      },
      winnings: winningsWithStatus
    })
  } catch (error) {
    console.error('Error checking prizes:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}