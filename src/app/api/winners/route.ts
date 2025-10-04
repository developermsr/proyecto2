import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const winners = await prisma.participation.findMany({
      where: {
        isWinner: true
      },
      include: {
        user: {
          select: {
            username: true,
            email: true
          }
        },
        raffle: {
          select: {
            title: true,
            prize: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedWinners = winners.map(winner => ({
      id: winner.id,
      username: winner.user.username,
      email: winner.user.email,
      ticketNumber: winner.ticketNumber,
      prize: winner.raffle.prize,
      raffleTitle: winner.raffle.title,
      createdAt: winner.createdAt,
      isDelivered: true
    }))

    return NextResponse.json(formattedWinners)
  } catch (error) {
    console.error('Error fetching winners:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}