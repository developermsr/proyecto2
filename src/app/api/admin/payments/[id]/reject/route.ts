import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const userPayload = verifyToken(token)
    if (!userPayload?.isAdmin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id: purchaseId } = await params

    const purchase = await prisma.purchase.findUnique({
      where: { id: purchaseId }
    })

    if (!purchase) {
      return NextResponse.json({ error: 'Compra no encontrada' }, { status: 404 })
    }

    if (purchase.paymentStatus !== 'pending') {
      return NextResponse.json({ error: 'Esta compra ya ha sido procesada' }, { status: 400 })
    }

    await prisma.purchase.update({
      where: { id: purchaseId },
      data: {
        paymentStatus: 'rejected'
      }
    })

    await prisma.raffle.update({
      where: { id: purchase.raffleId },
      data: {
        soldTickets: {
          decrement: 1
        }
      }
    })

    await prisma.user.update({
      where: { id: purchase.userId },
      data: {
        tickets: {
          decrement: 1
        }
      }
    })

    return NextResponse.json({ message: 'Pago rechazado exitosamente' })
  } catch (error) {
    console.error('Error rejecting payment:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}