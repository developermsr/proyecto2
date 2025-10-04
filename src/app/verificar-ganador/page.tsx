'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function VerificarGanador() {
  const [dni, setDni] = useState('')
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/verify-winner', {
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
              Verificar si he ganado
            </h1>
            <p className="text-lg text-gray-600">
              Revisa si eres uno de los afortunados ganadores
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
                {isLoading ? 'Verificando...' : 'Verificar si he ganado'}
              </button>
            </form>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {searchResult && (
            <div className={`glass p-8 rounded-lg ${searchResult.isWinner ? 'border-2 border-green-400 bg-green-50' : 'border-2 border-gray-300'}`}>
              <div className="text-center mb-6">
                {searchResult.isWinner ? (
                  <>
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-3xl font-bold text-green-600 mb-2">
                      ¡Felicidades! Eres un Ganador
                    </h2>
                    <p className="text-lg text-gray-700">
                      Has sido seleccionado como ganador de un premio
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">🤔</div>
                    <h2 className="text-3xl font-bold text-gray-600 mb-2">
                      No eres Ganador
                    </h2>
                    <p className="text-lg text-gray-700">
                      Lamentablemente no has sido seleccionado en esta oportunidad
                    </p>
                  </>
                )}
              </div>

              {searchResult.isWinner && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border-2 border-green-300">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">Detalles del Premio</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold text-gray-700">Premio Ganado:</p>
                        <p className="text-lg text-green-600">{searchResult.premio.nombre}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Valor del Premio:</p>
                        <p className="text-lg text-green-600">{searchResult.premio.valor}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Ticket Ganador:</p>
                        <p className="text-lg text-green-600">#{searchResult.ticket.numero}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Fecha del Sorteo:</p>
                        <p className="text-lg text-green-600">{searchResult.sorteo.fecha}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">
                      Pasos para Reclamar tu Premio
                    </h3>
                    <ol className="space-y-2 text-blue-700">
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                        Espera nuestro contacto dentro de las próximas 72 horas
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                        Te enviaremos un documento para que lo llenes y firmes
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                        Presenta tu DNI original en el momento de la entrega
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                        Recibe tu premio y ¡disfruta!
                      </li>
                    </ol>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                      Información Importante
                    </h3>
                    <ul className="space-y-2 text-yellow-700">
                      <li>• Los premios no son transferibles ni canjeables por efectivo</li>
                      <li>• Debes ser mayor de edad y presentar identificación válida</li>
                      <li>• Si no respondes dentro de 7 días hábiles, se realizará un nuevo sorteo</li>
                      <li>• La entrega del premio está sujeta a verificación de identidad</li>
                    </ul>
                  </div>
                </div>
              )}

              {!searchResult.isWinner && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Información de tu Participación
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Número de tickets:</strong> {searchResult.participacion.tickets.length}</p>
                      <p><strong>Fecha de sorteo:</strong> {searchResult.sorteo.fecha}</p>
                      <p><strong>Total de participantes:</strong> {searchResult.sorteo.totalParticipantes}</p>
                    </div>
                  </div>

                  <div className="bg-fuchsia-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-fuchsia-800 mb-3">
                      ¡No te desanimes!
                    </h3>
                    <p className="text-fuchsia-700 mb-3">
                      Aún tienes oportunidades de ganar en próximas rifas. Aquí tienes algunas opciones:
                    </p>
                    <ul className="space-y-2 text-fuchsia-700">
                      <li>• Compra más tickets para aumentar tus probabilidades</li>
                      <li>• Participa en nuestro programa de embajadores y gana puntos</li>
                      <li>• Invita a tus amigos y gana comisiones por sus compras</li>
                      <li>• Sigue nuestras redes sociales para no perderte las nuevas rifas</li>
                    </ul>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <a href="/rifas" className="btn-primary">
                      Ver Próximas Rifas
                    </a>
                    <a href="/programa-embajadores" className="btn-secondary">
                      Programa Embajadores
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              ¿Tienes dudas sobre el proceso?
            </p>
            <div className="flex justify-center space-x-4">
              <a href="/preguntas-frecuentes" className="btn-secondary">
                Preguntas Frecuentes
              </a>
              <a href="/contacto" className="btn-secondary">
                Contactar Soporte
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}