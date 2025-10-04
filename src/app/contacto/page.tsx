'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('¡Mensaje enviado exitosamente! Te responderemos pronto.')
        setFormData({
          nombre: '',
          email: '',
          asunto: '',
          mensaje: ''
        })
      } else {
        setMessage(data.error || 'Error al enviar el mensaje')
      }
    } catch (error) {
      console.error('Error sending contact form:', error)
      setMessage('Error de conexión. Por favor intenta más tarde.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-fuchsia mb-4">
              📞 Contacto
            </h1>
            <p className="text-lg text-gray-600">
              Estamos aquí para ayudarte. Contáctanos por cualquier consulta o sugerencia.
            </p>
          </div>

          {message && (
            <div className={`mb-8 p-4 rounded-lg text-center ${
              message.includes('exitosamente')
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                  📋 Información de Contacto
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-fuchsia text-xl">📧</div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600">support@bless.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-fuchsia text-xl">📱</div>
                    <div>
                      <h3 className="font-semibold">WhatsApp</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-fuchsia text-xl">📍</div>
                    <div>
                      <h3 className="font-semibold">Ubicación</h3>
                      <p className="text-gray-600">Ciudad de México, México</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                  ⏰ Horarios de Atención
                </h2>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Lunes a Viernes:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados:</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingos:</span>
                    <span>Cerrado</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                ✉️ Envíanos un Mensaje
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia focus:border-transparent"
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia focus:border-transparent"
                    placeholder="juan@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                    Asunto *
                  </label>
                  <select
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia focus:border-transparent"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="soporte">Soporte técnico</option>
                    <option value="rifas">Consultas sobre rifas</option>
                    <option value="referidos">Sistema de referidos</option>
                    <option value="pago">Problemas de pago</option>
                    <option value="sugerencia">Sugerencias</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia focus:border-transparent"
                    placeholder="Describe tu consulta o sugerencia..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-4">
              ¿Prefieres hablar con nosotros directamente?
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-fuchsia hover:text-fuchsia-600 transition-colors">
                <span className="text-2xl">💬</span>
                <p className="text-sm mt-1">Chat en vivo</p>
              </a>
              <a href="#" className="text-fuchsia hover:text-fuchsia-600 transition-colors">
                <span className="text-2xl">📱</span>
                <p className="text-sm mt-1">WhatsApp</p>
              </a>
              <a href="/ayuda" className="text-fuchsia hover:text-fuchsia-600 transition-colors">
                <span className="text-2xl">❓</span>
                <p className="text-sm mt-1">Centro de ayuda</p>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}