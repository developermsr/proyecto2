'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface Winner {
  id: string
  username: string
  email: string
  ticketNumber: number
  prize: string
  raffleTitle: string
  createdAt: string
  isDelivered: boolean
}

export default function Ganadores() {
  const [winners, setWinners] = useState<Winner[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchWinners()
  }, [])

  const fetchWinners = async () => {
    try {
      const response = await fetch('/api/winners')
      if (response.ok) {
        const data = await response.json()
        setWinners(data)
      }
    } catch (error) {
      console.error('Error fetching winners:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-16 px-4">
          <div className="container mx-auto text-center">
            <p>Cargando ganadores...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-fuchsia mb-4">
              🏆 Ganadores
            </h1>
            <p className="text-lg text-gray-600">
              Lista oficial de ganadores de nuestras rifas
            </p>
          </div>

          <div className="glass p-8 rounded-lg">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                Últimos Ganadores
              </h2>
              <p className="text-gray-600 mb-4">
                Felicitaciones a todos nuestros ganadores. ¡Los próximos podrías ser tú!
              </p>
            </div>

            {winners.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎰</div>
                <p className="text-xl text-gray-600 mb-4">
                  Todavía no hay ganadores registrados
                </p>
                <p className="text-gray-500">
                  Los ganadores aparecerán aquí una vez que se realicen los sorteos
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Premio</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Ganador</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Ticket</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Rifa</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Fecha</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {winners.map((winner, index) => (
                      <tr key={winner.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-semibold">
                            {index === 0 ? '🥇 1er Premio' :
                             index === 1 ? '🥈 2do Premio' :
                             index === 2 ? '🥉 3er Premio' : `Premio ${index + 1}`}
                          </div>
                          <div className="text-sm text-gray-600">{winner.prize}</div>
                        </td>
                        <td className="py-3 px-4 font-semibold">{winner.username}</td>
                        <td className="py-3 px-4">#{winner.ticketNumber.toString().padStart(4, '0')}</td>
                        <td className="py-3 px-4 text-sm">{winner.raffleTitle}</td>
                        <td className="py-3 px-4 text-sm">
                          {new Date(winner.createdAt).toLocaleDateString('es-PE')}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            winner.isDelivered
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {winner.isDelivered ? 'Entregado' : 'Por entregar'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                📋 Información Importante
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Los ganadores son contactados por correo electrónico y teléfono dentro de las 72 horas siguientes al sorteo</li>
                <li>• Para reclamar el premio, es necesario presentar DNI original y firmar el documento de recepción</li>
                <li>• Los premios no son transferibles ni canjeables por efectivo</li>
                <li>• La lista completa de participantes puede ser consultada en la sección "Verificar mi Participación"</li>
                <li>• Si un ganador no reclama su premio dentro de 7 días, se realizará un nuevo sorteo</li>
              </ul>
            </div>

            <div className="mt-8 bg-fuchsia-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-fuchsia-800 mb-3">
                🎯 ¿Quieres ser el próximo ganador?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-fuchsia-700">
                <div>
                  <h4 className="font-semibold mb-2">Participa en nuestras rifas</h4>
                  <p className="text-sm">Compra tickets y aumenta tus probabilidades de ganar</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Invita a tus amigos</h4>
                  <p className="text-sm">Gana comisiones por cada persona que registres</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              ¿Quieres verificar si eres uno de los ganadores?
            </p>
            <div className="flex justify-center space-x-4">
              <a href="/verificar-ganador" className="btn-primary">
                Verificar si he ganado
              </a>
              <Link href="/rifas" className="btn-secondary">
                Ver Rifas Activas
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}