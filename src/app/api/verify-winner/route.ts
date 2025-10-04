import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { dni, ticketNumber, raffleId } = await request.json()

    if (!dni && !ticketNumber) {
      return NextResponse.json(
        { error: 'DNI o número de ticket son requeridos' },
        { status: 400 }
      )
    }

    let participations: any[] = []

    if (dni) {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { username: dni },
            { email: dni }
          ]
        }
      })

      if (!user) {
        return NextResponse.json({
          isWinner: false,
          message: 'Usuario no encontrado'
        })
      }

      participations = await prisma.participation.findMany({
        where: { userId: user.id },
        include: {
          raffle: {
            select: {
              title: true,
              prize: true,
              isActive: true,
              endDate: true
            }
          }
        }
      })
    } else if (ticketNumber && raffleId) {
      const participation = await prisma.participation.findFirst({
        where: {
          ticketNumber: parseInt(ticketNumber),
          raffleId
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
              prize: true,
              isActive: true,
              endDate: true
            }
          }
        }
      })

      participations = participation ? [participation] : []
    }

    if (participations.length === 0) {
      return NextResponse.json({
        isWinner: false,
        message: 'No se encontraron participaciones'
      })
    }

    const winningParticipations = participations.filter(p =>
      p.isWinner || p.raffle.winnerId === p.userId
    )

    if (winningParticipations.length > 0) {
      const winner = winningParticipations[0]
      return NextResponse.json({
        isWinner: true,
        premio: {
          nombre: winner.raffle.prize,
          valor: 'Premio exclusivo'
        },
        ticket: {
          numero: winner.ticketNumber
        },
        sorteo: {
          fecha: new Date(winner.createdAt).toLocaleDateString('es-PE')
        },
        participacion: {
          tickets: participations
        }
      })
    }

    return NextResponse.json({
      isWinner: false,
      participacion: {
        tickets: participations,
        totalParticipantes: participations.length
      },
      sorteo: {
        fecha: participations.length > 0
          ? new Date(participations[0].createdAt).toLocaleDateString('es-PE')
          : 'N/A'
      }
    })
  } catch (error) {
    console.error('Error verifying winner:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}