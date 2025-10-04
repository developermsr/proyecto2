import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { raffleId } = await request.json()

    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const userPayload = verifyToken(token)
    if (!userPayload?.isAdmin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const raffle = await prisma.raffle.findUnique({
      where: { id: raffleId },
      include: {
        participations: {
          include: {
            user: true
          }
        }
      }
    })

    if (!raffle) {
      return NextResponse.json({ error: 'Rifa no encontrada' }, { status: 404 })
    }

    if (raffle.winnerId) {
      return NextResponse.json({ error: 'Esta rifa ya tiene un ganador' }, { status: 400 })
    }

    if (raffle.participations.length === 0) {
      return NextResponse.json({ error: 'No hay participantes en esta rifa' }, { status: 400 })
    }

    const randomIndex = Math.floor(Math.random() * raffle.participations.length)
    const winner = raffle.participations[randomIndex]

    await prisma.raffle.update({
      where: { id: raffleId },
      data: {
        winnerId: winner.userId,
        isActive: false
      }
    })

    await prisma.participation.update({
      where: { id: winner.id },
      data: {
        isWinner: true
      }
    })

    await prisma.user.update({
      where: { id: winner.userId },
      data: {
        points: {
          increment: 1000
        }
      }
    })

    return NextResponse.json({
      message: 'Ganador seleccionado exitosamente',
      winner: {
        id: winner.user.id,
        username: winner.user.username,
        email: winner.user.email,
        ticketNumber: winner.ticketNumber
      }
    })
  } catch (error) {
    console.error('Error drawing winner:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}