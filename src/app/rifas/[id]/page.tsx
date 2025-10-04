'use client'

import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PaymentForm from '@/components/payment/PaymentForm'
import React from 'react'

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

interface User {
  id: string
  username: string
  email: string
  phone?: string
  isAdmin: boolean
  isActive: boolean
  points: number
  tickets: number
  canRefer: boolean
  createdAt: string
  referredById?: string
  referredBy?: {
    username: string
  }
  _count?: {
    referredTo?: number
    purchases?: number
    redemptions?: number
  }
}

export default function RaffleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const [raffle, setRaffle] = useState<Raffle | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [ticketCount, setTicketCount] = useState(1)
  const [error, setError] = useState('')

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')

      const [raffleRes, userRes] = await Promise.all([
        fetch(`/api/raffles/${id}`),
        token ? fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        }) : Promise.resolve({ ok: false, json: () => ({}) })
      ])

      if (raffleRes.ok) {
        const raffleData = await raffleRes.json()
        setRaffle(raffleData)
      } else {
        setError('Rifa no encontrada')
      }

      if (userRes.ok) {
        const userData = await userRes.json()
        setUser(userData as User)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Error al cargar los datos')
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchData()
  }, [id, fetchData])

  const getProgressPercentage = (sold: number, max: number) => {
    return (sold / max) * 100
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-16 px-4">
          <div className="container mx-auto text-center">
            <p>Cargando...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !raffle) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-16 px-4">
          <div className="container mx-auto text-center">
            <p className="text-xl text-red-600">{error || 'Rifa no encontrada'}</p>
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
        <div className="container mx-auto max-w-4xl">
          <div className="glass p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-fuchsia mb-4">
                {raffle.title}
              </h1>
              <p className="text-lg text-gray-600">{raffle.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-fuchsia to-purple text-white p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold mb-2">
                    {raffle.prize}
                  </div>
                  <div className="text-sm opacity-90">Premio Principal</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Detalles de la Rifa</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Precio por ticket:</span>
                      <span className="font-semibold">S/{raffle.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tickets disponibles:</span>
                      <span className="font-semibold">{raffle.maxTickets - raffle.soldTickets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fecha de sorteo:</span>
                      <span className="font-semibold">
                        {new Date(raffle.endDate).toLocaleDateString('es-PE')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Progreso de Ventas</h3>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{raffle.soldTickets}/{raffle.maxTickets} tickets vendidos</span>
                      <span>{getProgressPercentage(raffle.soldTickets, raffle.maxTickets).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-fuchsia h-3 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(raffle.soldTickets, raffle.maxTickets)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {raffle.isActive ? (
                  <div className="space-y-3">
                    {user ? (
                      <>
                        <div className="flex items-center space-x-3">
                          <label className="text-sm font-medium text-gray-700">Cantidad de tickets:</label>
                          <input
                            type="number"
                            min="1"
                            max={Math.min(10, raffle.maxTickets - raffle.soldTickets)}
                            value={ticketCount}
                            onChange={(e) => setTicketCount(Math.max(1, Math.min(10, raffle.maxTickets - raffle.soldTickets, parseInt(e.target.value) || 1)))}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia"
                          />
                          <span className="text-sm text-gray-600">
                            (Máximo: {Math.min(10, raffle.maxTickets - raffle.soldTickets)})
                          </span>
                        </div>
                        <div className="text-lg font-semibold text-fuchsia">
                          Total: S/ {(ticketCount * raffle.price).toFixed(2)}
                        </div>
                        <button
                          onClick={() => setShowPaymentForm(true)}
                          className="btn-primary w-full"
                          disabled={raffle.soldTickets >= raffle.maxTickets}
                        >
                          {raffle.soldTickets >= raffle.maxTickets ? 'Agotado' : `Comprar ${ticketCount} Ticket${ticketCount > 1 ? 's' : ''} (S/ ${(ticketCount * raffle.price).toFixed(2)})`}
                        </button>
                      </>
                    ) : (
                      <div className="text-center">
                        <p className="text-gray-600 mb-3">Debes iniciar sesión para participar</p>
                        <a href="/login" className="btn-primary inline-block">
                          Iniciar Sesión
                        </a>
                      </div>
                    )}

                    {user && user.points >= 500 && (
                      <button className="btn-secondary w-full">
                        Canjear con puntos (500 pts)
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
                    <p className="text-red-600 font-semibold">Rifa Finalizada</p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Términos y Condiciones</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• El sorteo se realizará automáticamente en la fecha indicada</li>
                <li>• Los ganadores serán contactados por correo electrónico</li>
                <li>• Los tickets no son reembolsables</li>
                <li>• Debes ser mayor de edad para participar</li>
                <li>• El pago debe ser confirmado para validar tu participación</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {showPaymentForm && raffle && (
        <PaymentForm
          amount={ticketCount * raffle.price}
          raffleId={raffle.id}
          onSuccess={() => {
            setShowPaymentForm(false)
            // Refresh data after successful purchase
            fetchData()
          }}
          onError={(error) => {
            setError(error)
          }}
        />
      )}

      <Footer />
    </div>
  )
}