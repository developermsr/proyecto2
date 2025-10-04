import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { username, email, phone, password, referrerCode } = await request.json()

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Usuario, email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'El usuario o email ya está registrado' },
        { status: 400 }
      )
    }

    const hashedPassword = await hashPassword(password)

    let referredBy = null
    if (referrerCode) {
      const referrer = await prisma.user.findUnique({
        where: { username: referrerCode }
      })
      if (referrer) {
        referredBy = referrer.id
      }
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        phone,
        password: hashedPassword,
        referredById: referredBy
      }
    })

    return NextResponse.json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Error en registro:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}