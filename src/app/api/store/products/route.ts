import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        stock: {
          gt: 0
        }
      },
      orderBy: {
        points: 'asc'
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, points, stock, image } = await request.json()

    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const userPayload = verifyToken(token)
    if (!userPayload?.isAdmin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        points: parseInt(points),
        stock: parseInt(stock),
        image
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

