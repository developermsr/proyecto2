'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface SearchResult {
  participant: {
    nombre: string
    dni: string
    ciudad: string
    email: string
  }
  rifa: {
    nombre: string
    fechaSorteo: string
  }
  tickets: Array<{
    numero: number
    fechaCompra: string
    estado: string
    premio: string
  }>
}

export default function VerificarParticipacion() {
  const [dni, setDni] = useState('')
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/verify-participation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dni })
      })

      const data = await response.json()

      if (response.ok) {
        setSearchResult(data)
      } else {
        setError(data.error || 'No se encontraron resultados')
        setSearchResult(null)
      }
    } catch {
      setError('Error de conexión')
      setSearchResult(null)
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
              Verificar mi Participación
            </h1>
            <p className="text-lg text-gray-600">
              Valida si estás registrado en la lista de participantes de la rifa
            </p>
          </div>

          <div className="glass p-8 rounded-lg mb-8">
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="mb-6">
                <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-2">
                  Ingresa tu DNI o Carnet de Extranjería
                </label>
                <input
                  type="text"
                  id="dni"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  className="input-field w-full"
                  placeholder="12345678"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? 'Verificando...' : 'Verificar Participación'}
              </button>
            </form>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {searchResult && (
            <div className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-fuchsia mb-6">
                Resultados de tu Búsqueda
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Datos del Participante</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Nombre:</strong> {searchResult.participant.nombre}</p>
                    <p><strong>DNI:</strong> {searchResult.participant.dni}</p>
                    <p><strong>Ciudad:</strong> {searchResult.participant.ciudad}</p>
                    <p><strong>Email:</strong> {searchResult.participant.email}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Información de la Rifa</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Rifa:</strong> {searchResult.rifa.nombre}</p>
                    <p><strong>Fecha del sorteo:</strong> {searchResult.rifa.fechaSorteo}</p>
                    <p><strong>Precio por ticket:</strong> S/5</p>
                    <p><strong>Meta de tickets:</strong> 1,000 tickets</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-fuchsia mb-4">Tus Tickets</h3>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-2 px-4 font-semibold text-gray-700">Ticket</th>
                        <th className="text-left py-2 px-4 font-semibold text-gray-700">Fecha de Compra</th>
                        <th className="text-left py-2 px-4 font-semibold text-gray-700">Estado</th>
                        <th className="text-left py-2 px-4 font-semibold text-gray-700">Participa en:</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResult.tickets.map((ticket, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="py-2 px-4">{ticket.numero}</td>
                          <td className="py-2 px-4">{ticket.fechaCompra}</td>
                          <td className="py-2 px-4">
                            <span className={`px-2 py-1 rounded-full text-sm ${
                              ticket.estado === 'Activo'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {ticket.estado}
                            </span>
                          </td>
                          <td className="py-2 px-4">{ticket.premio}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  Información Importante
                </h3>
                <ul className="space-y-2 text-blue-700 text-sm">
                  <li>• El sorteo se realizará el 11/11/2025 a las 8:00 PM</li>
                  <li>• La transmisión será en vivo en nuestra página de Instagram: @bless_peru</li>
                  <li>• No es necesario estar presente en la transmisión para ganar</li>
                  <li>• Los ganadores serán contactados dentro de las 72 horas</li>
                  <li>• Si un ticket resulta ganador, será eliminado de la lista para premios futuros</li>
                </ul>
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              ¿Necesitas ayuda con tu verificación?
            </p>
            <div className="flex justify-center space-x-4">
              <a href="/contacto" className="btn-secondary">
                Contactar Soporte
              </a>
              <a href="/preguntas-frecuentes" className="btn-secondary">
                Preguntas Frecuentes
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}