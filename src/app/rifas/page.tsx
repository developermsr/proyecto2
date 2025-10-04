'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface Raffle {
  id: string
  title: string
  description: string
  price: number
  maxTickets: number
  soldTickets: number
  prize: string
  endDate: string
  isActive: boolean
}

export default function RafflesPage() {
  const [raffles, setRaffles] = useState<Raffle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRaffles()
  }, [])

  const fetchRaffles = async () => {
    try {
      const response = await fetch('/api/raffles')
      if (response.ok) {
        const data = await response.json()
        setRaffles(data)
      }
    } catch (error) {
      console.error('Error fetching raffles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getProgressPercentage = (sold: number, max: number) => {
    return (sold / max) * 100
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-16 px-4">
          <div className="container mx-auto text-center">
            <p>Cargando rifas...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center text-fuchsia mb-12">
            Rifas Activas
          </h1>

          {raffles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No hay rifas activas en este momento.</p>
              <p className="text-gray-500 mt-4">Vuelve pronto para nuevas oportunidades!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {raffles.map((raffle) => (
                <div key={raffle.id} className="glass p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-fuchsia mb-2">
                    {raffle.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{raffle.description}</p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Boletos vendidos: {raffle.soldTickets}/{raffle.maxTickets}</span>
                      <span>{getProgressPercentage(raffle.soldTickets, raffle.maxTickets).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-fuchsia h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(raffle.soldTickets, raffle.maxTickets)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Precio:</span>
                      <span className="font-semibold">S/{raffle.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Premio:</span>
                      <span className="font-semibold">{raffle.prize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Finaliza:</span>
                      <span className="font-semibold">
                        {new Date(raffle.endDate).toLocaleDateString('es-PE')}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/rifas/${raffle.id}`}
                    className="btn-primary w-full text-center inline-block"
                  >
                    Participar
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}