import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { productId, quantity } = await request.json()

    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const userPayload = verifyToken(token)
    if (!userPayload) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userPayload.id }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product || !product.isActive) {
      return NextResponse.json({ error: 'Producto no disponible' }, { status: 404 })
    }

    if (product.stock < quantity) {
      return NextResponse.json({ error: 'Stock insuficiente' }, { status: 400 })
    }

    const totalPoints = product.points * quantity

    if (user.points < totalPoints) {
      return NextResponse.json({ error: 'Puntos insuficientes' }, { status: 400 })
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          points: {
            decrement: totalPoints
          }
        }
      }),
      prisma.product.update({
        where: { id: productId },
        data: {
          stock: {
            decrement: quantity
          }
        }
      }),
      prisma.redemption.create({
        data: {
          userId: user.id,
          productId,
          quantity,
          status: 'pending'
        }
      })
    ])

    return NextResponse.json({
      message: 'Canje realizado exitosamente',
      totalPoints,
      quantity
    })
  } catch (error) {
    console.error('Error redeeming product:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}