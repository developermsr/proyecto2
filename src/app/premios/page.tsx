'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function PrizesPage() {
  const [username, setUsername] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/prizes/check?username=${encodeURIComponent(username)}`)

      if (response.ok) {
        const data = await response.json()
        setResults(data.winnings)
      } else {
        setResults([])
        alert('Usuario no encontrado o sin premios')
      }
    } catch (error) {
      console.error('Error searching prizes:', error)
      alert('Error de conexión')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-center text-fuchsia mb-12">
            Consulta de Premios
          </h1>

          <div className="glass p-8 mb-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingresa tu nombre de usuario"
                  className="input-field w-full"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? 'Buscando...' : 'Buscar Premios'}
              </button>
            </form>
          </div>

          {results.length > 0 && (
            <div className="glass p-8">
              <h2 className="text-2xl font-bold text-fuchsia mb-6">
                Premios Ganados
              </h2>
              <div className="space-y-6">
                {results.map((winning) => (
                  <div key={winning.id} className="border-2 border-yellow-300 bg-yellow-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-4">🏆</span>
                      <div>
                        <h3 className="text-xl font-bold text-yellow-800">
                          ¡Felicidades! Has ganado
                        </h3>
                        <p className="text-yellow-700">{winning.raffle.prize}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="font-medium text-gray-700">Rifa:</span>
                        <p className="text-gray-900">{winning.raffle.title}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Boleto Ganador:</span>
                        <p className="text-gray-900 font-mono">#{winning.ticketNumber}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Fecha del Sorteo:</span>
                        <p className="text-gray-900">
                          {new Date(winning.raffle.endDate).toLocaleDateString('es-PE')}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Estado del Premio:</span>
                        <p className={`font-medium ${
                          winning.claimed
                            ? 'text-green-600'
                            : 'text-orange-600'
                        }`}>
                          {winning.claimed ? 'Reclamado' : 'Pendiente de reclamo'}
                        </p>
                      </div>
                    </div>

                    {!winning.claimed && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">
                          Instrucciones para reclamar tu premio:
                        </h4>
                        <ol className="text-sm text-blue-700 space-y-1">
                          <li>1. Contacta al administrador de Bless</li>
                          <li>2. Presenta tu documento de identidad</li>
                          <li>3. Muestra este comprobante de ganador</li>
                          <li>4. Coordina la entrega de tu premio</li>
                        </ol>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}