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
      where: { id: purchaseId },
      include: {
        user: true,
        raffle: true
      }
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
        paymentStatus: 'completed'
      }
    })

    await prisma.user.update({
      where: { id: purchase.userId },
      data: {
        points: {
          increment: Math.floor(purchase.amount)
        }
      }
    })

    const purchaseCount = await prisma.purchase.count({
      where: {
        userId: purchase.userId,
        paymentStatus: 'completed'
      }
    })

    if (purchaseCount >= 3) {
      await prisma.user.update({
        where: { id: purchase.userId },
        data: {
          canRefer: true
        }
      })
    }

    if (purchase.user.referredById) {
      const referrer = await prisma.user.findUnique({
        where: { id: purchase.user.referredById }
      })

      if (referrer && referrer.isActive) {
        const bonusAmount = Math.floor(purchase.amount * 0.2)
        await prisma.referralBonus.create({
          data: {
            userId: referrer.id,
            sourceId: purchase.userId,
            amount: bonusAmount,
            level: 1
          }
        })

        await prisma.user.update({
          where: { id: referrer.id },
          data: {
            points: {
              increment: bonusAmount
            }
          }
        })
      }
    }

    return NextResponse.json({ message: 'Pago confirmado exitosamente' })
  } catch (error) {
    console.error('Error confirming payment:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}