import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { raffleId, amount, paymentMethod, referenceCode } = await request.json()

    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const userPayload = verifyToken(token)
    if (!userPayload) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const raffle = await prisma.raffle.findUnique({
      where: { id: raffleId }
    })

    if (!raffle || !raffle.isActive) {
      return NextResponse.json({ error: 'Rifa no disponible' }, { status: 404 })
    }

    if (raffle.soldTickets >= raffle.maxTickets) {
      return NextResponse.json({ error: 'Rifa agotada' }, { status: 400 })
    }

    const nextTicketNumber = raffle.soldTickets + 1

    const purchase = await prisma.purchase.create({
      data: {
        userId: userPayload.id,
        raffleId,
        ticketNumber: nextTicketNumber,
        paymentMethod,
        paymentStatus: 'pending',
        amount,
        reference: referenceCode
      }
    })

    await prisma.raffle.update({
      where: { id: raffleId },
      data: {
        soldTickets: {
          increment: 1
        }
      }
    })

    await prisma.participation.create({
      data: {
        userId: userPayload.id,
        raffleId,
        purchaseId: purchase.id,
        ticketNumber: nextTicketNumber
      }
    })

    await prisma.user.update({
      where: { id: userPayload.id },
      data: {
        tickets: {
          increment: 1
        }
      }
    })

    const purchaseCount = await prisma.purchase.count({
      where: {
        userId: userPayload.id,
        paymentStatus: 'completed'
      }
    })

    if (purchaseCount >= 3) {
      await prisma.user.update({
        where: { id: userPayload.id },
        data: {
          canRefer: true
        }
      })
    }

    return NextResponse.json({
      message: 'Compra registrada exitosamente',
      purchase: {
        id: purchase.id,
        ticketNumber: nextTicketNumber,
        paymentStatus: 'pending'
      }
    })
  } catch (error) {
    console.error('Error creating purchase:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}