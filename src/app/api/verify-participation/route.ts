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

    let participations: Array<{
      id: string;
      ticketNumber: number;
      raffle: {
        title: string;
        description: string;
        prize: string;
        isActive: boolean;
        endDate: Date;
      };
      purchase: {
        paymentStatus: string;
        amount: number;
        createdAt: Date;
      };
      createdAt: Date;
      isWinner: boolean;
    }> = []

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
          isValid: false,
          message: 'Usuario no encontrado'
        })
      }

      participations = await prisma.participation.findMany({
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
          },
          purchase: {
            select: {
              paymentStatus: true,
              amount: true,
              createdAt: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
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
              description: true,
              prize: true,
              isActive: true,
              endDate: true
            }
          },
          purchase: {
            select: {
              paymentStatus: true,
              amount: true,
              createdAt: true
            }
          }
        }
      })

      participations = participation ? [participation] : []
    }

    if (participations.length === 0) {
      return NextResponse.json({
        isValid: false,
        message: 'No se encontraron participaciones'
      })
    }

    const formattedParticipations = participations.map(p => ({
      id: p.id,
      ticketNumber: p.ticketNumber,
      raffleTitle: p.raffle.title,
      raffleDescription: p.raffle.description,
      prize: p.raffle.prize,
      isActive: p.raffle.isActive,
      endDate: p.raffle.endDate,
      purchaseDate: p.createdAt,
      paymentStatus: p.purchase.paymentStatus,
      amount: p.purchase.amount,
      isWinner: p.isWinner
    }))

    return NextResponse.json({
      isValid: true,
      participations: formattedParticipations,
      totalParticipations: participations.length
    })
  } catch (error) {
    console.error('Error verifying participation:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}