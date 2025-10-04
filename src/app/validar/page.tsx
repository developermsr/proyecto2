'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function ValidationPage() {
  const [username, setUsername] = useState('')
  const [results, setResults] = useState<Array<{
      id: string;
      ticketNumber: number;
      raffle: {
        title: string;
        description: string;
        endDate: string;
      };
      isValid: boolean;
    }>>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/validation/check?username=${encodeURIComponent(username)}`)

      if (response.ok) {
        const data = await response.json()
        setResults(data.participations)
      } else {
        setResults([])
        alert('Usuario no encontrado o sin participaciones')
      }
    } catch (error) {
      console.error('Error validating participation:', error)
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
            Validar Participación
          </h1>

          <div className="glass p-8 mb-8">
            <form onSubmit={handleValidate} className="space-y-4">
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
                {isLoading ? 'Validando...' : 'Validar Participación'}
              </button>
            </form>
          </div>

          {results.length > 0 && (
            <div className="glass p-8">
              <h2 className="text-2xl font-bold text-fuchsia mb-6">
                Participaciones Encontradas
              </h2>
              <div className="space-y-4">
                {results.map((participation) => (
                  <div key={participation.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{participation.raffle.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        participation.isWinner
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {participation.isWinner ? '🏆 Ganador' : 'Participante'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{participation.raffle.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Boleto:</span> #{participation.ticketNumber}
                      </div>
                      <div>
                        <span className="font-medium">Fecha:</span> {
                          new Date(participation.createdAt).toLocaleDateString('es-PE')
                        }
                      </div>
                      <div>
                        <span className="font-medium">Estado:</span> {
                          participation.raffle.isActive ? 'Activa' : 'Finalizada'
                        }
                      </div>
                      {participation.isWinner && (
                        <div>
                          <span className="font-medium text-green-600">Premio:</span> {
                            participation.raffle.prize
                          }
                        </div>
                      )}
                    </div>
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