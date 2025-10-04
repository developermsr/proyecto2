import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { nombre, email, asunto, mensaje } = await request.json()

    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      )
    }

    // Guardar el mensaje en la base de datos
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: nombre,
        email,
        subject: asunto,
        message: mensaje,
        status: 'pending',
        createdAt: new Date()
      }
    })

    // Aquí podrías agregar lógica para enviar notificaciones por email
    // Por ejemplo, usando nodemailer o un servicio de email

    return NextResponse.json({
      message: 'Mensaje enviado exitosamente',
      id: contactMessage.id
    })
  } catch (error) {
    console.error('Error sending contact form:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 50 // Limitar a los últimos 50 mensajes
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}