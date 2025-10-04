import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const userPayload = verifyToken(token)
    if (!userPayload?.isAdmin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const [totalUsers, totalRaffles, totalPurchases, pendingPayments] = await Promise.all([
      prisma.user.count({
        where: { isActive: true }
      }),
      prisma.raffle.count({
        where: { isActive: true }
      }),
      prisma.purchase.count({
        where: { paymentStatus: 'completed' }
      }),
      prisma.purchase.findMany({
        where: { paymentStatus: 'pending' },
        include: {
          user: {
            select: {
              username: true,
              email: true
            }
          },
          raffle: {
            select: {
              title: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    ])

    const stats = {
      totalUsers,
      totalRaffles,
      totalPurchases,
      pendingPayments: pendingPayments.length
    }

    return NextResponse.json({
      stats,
      pendingPayments
    })
  } catch (error) {
    console.error('Error fetching admin dashboard:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}