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
    if (!userPayload) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userPayload.id },
      include: {
        referredTo: {
          include: {
            referredTo: {
              include: {
                referredTo: true
              }
            }
          }
        },
        referralBonusesReceived: {
          select: {
            amount: true,
            level: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const level1Referrals = user.referredTo.length
    const level2Referrals = user.referredTo.reduce((acc, ref) => acc + ref.referredTo.length, 0)
    const level3Referrals = user.referredTo.reduce((acc, ref) =>
      acc + ref.referredTo.reduce((acc2, ref2) => acc2 + ref2.referredTo.length, 0), 0
    )

    const totalPoints = user.referralBonusesReceived.reduce((acc, bonus) => acc + bonus.amount, 0)

    const referrals = []

    for (const ref1 of user.referredTo) {
      referrals.push({
        id: ref1.id,
        username: ref1.username,
        email: ref1.email,
        createdAt: ref1.createdAt,
        level: 1
      })

      for (const ref2 of ref1.referredTo) {
        referrals.push({
          id: ref2.id,
          username: ref2.username,
          email: ref2.email,
          createdAt: ref2.createdAt,
          level: 2
        })

        for (const ref3 of ref2.referredTo) {
          referrals.push({
            id: ref3.id,
            username: ref3.username,
            email: ref3.email,
            createdAt: ref3.createdAt,
            level: 3
          })
        }
      }
    }

    const stats = {
      totalReferrals: level1Referrals + level2Referrals + level3Referrals,
      totalPoints,
      level1Referrals,
      level2Referrals,
      level3Referrals
    }

    return NextResponse.json({
      stats,
      referrals,
      username: user.username
    })
  } catch (error) {
    console.error('Error fetching referral stats:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}