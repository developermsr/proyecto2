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

    const participations = await prisma.participation.findMany({
      where: { userId: user.id },
      include: {
        raffle: {
          select: {
            title: true,
            description: true,
            prize: true,
            isActive: true,
            endDate: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      user: {
        username: user.username,
        email: user.email
      },
      participations
    })
  } catch (error) {
    console.error('Error validating participation:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { ticketNumber, raffleId } = await request.json()

    if (!ticketNumber || !raffleId) {
      return NextResponse.json(
        { error: 'Número de ticket y rifa son requeridos' },
        { status: 400 }
      )
    }

    const participation = await prisma.participation.findFirst({
      where: {
        ticketNumber: parseInt(ticketNumber),
        raffleId
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        },
        raffle: {
          select: {
            title: true,
            isActive: true,
            endDate: true,
            winnerId: true
          }
        }
      }
    })

    if (!participation) {
      return NextResponse.json({
        valid: false,
        message: 'Ticket no encontrado'
      })
    }

    const isWinner = participation.isWinner || participation.raffle.winnerId === participation.user.id

    return NextResponse.json({
      valid: true,
      participation: {
        ticketNumber: participation.ticketNumber,
        user: participation.user.username,
        raffle: participation.raffle.title,
        isWinner,
        purchaseDate: participation.createdAt,
        raffleStatus: participation.raffle.isActive ? 'active' : 'finished'
      }
    })
  } catch (error) {
    console.error('Error validating ticket:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}