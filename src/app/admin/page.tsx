'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface DashboardStats {
  totalUsers: number
  totalRaffles: number
  totalPurchases: number
  pendingPayments: number
}

interface PendingPayment {
  id: string
  user: {
    username: string
    email: string
  }
  raffle: {
    title: string
  }
  amount: number
  paymentMethod: string
  reference: string
  createdAt: string
}

export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalRaffles: 0,
    totalPurchases: 0,
    pendingPayments: 0
  })
  const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        setPendingPayments(data.pendingPayments)
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const confirmPayment = async (purchaseId: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/payments/${purchaseId}/confirm`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        alert('Pago confirmado exitosamente')
        fetchAdminData()
      } else {
        alert('Error al confirmar pago')
      }
    } catch (error) {
      console.error('Error confirming payment:', error)
      alert('Error de conexión')
    }
  }

  const rejectPayment = async (purchaseId: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/payments/${purchaseId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        alert('Pago rechazado')
        fetchAdminData()
      } else {
        alert('Error al rechazar pago')
      }
    } catch (error) {
      console.error('Error rejecting payment:', error)
      alert('Error de conexión')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-16 px-4">
          <div className="container mx-auto text-center">
            <p>Cargando panel de administrador...</p>
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
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-center text-fuchsia mb-12">
            Panel de Administrador
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="glass p-6 text-center">
              <div className="text-3xl font-bold text-fuchsia mb-2">
                {stats.totalUsers}
              </div>
              <div className="text-gray-600">Usuarios</div>
            </div>

            <div className="glass p-6 text-center">
              <div className="text-3xl font-bold text-fuchsia mb-2">
                {stats.totalRaffles}
              </div>
              <div className="text-gray-600">Rifas</div>
            </div>

            <div className="glass p-6 text-center">
              <div className="text-3xl font-bold text-fuchsia mb-2">
                {stats.totalPurchases}
              </div>
              <div className="text-gray-600">Compras</div>
            </div>

            <div className="glass p-6 text-center">
              <div className="text-3xl font-bold text-fuchsia mb-2">
                {stats.pendingPayments}
              </div>
              <div className="text-gray-600">Pagos Pendientes</div>
            </div>
          </div>

          <div className="glass p-8">
            <h2 className="text-2xl font-bold text-fuchsia mb-6">
              Pagos Pendientes de Confirmación
            </h2>

            {pendingPayments.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                No hay pagos pendientes de confirmación.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Usuario</th>
                      <th className="text-left py-3 px-4">Rifa</th>
                      <th className="text-left py-3 px-4">Monto</th>
                      <th className="text-left py-3 px-4">Método</th>
                      <th className="text-left py-3 px-4">Referencia</th>
                      <th className="text-left py-3 px-4">Fecha</th>
                      <th className="text-left py-3 px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingPayments.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{payment.user.username}</div>
                            <div className="text-sm text-gray-600">{payment.user.email}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{payment.raffle.title}</td>
                        <td className="py-3 px-4 font-semibold">S/{payment.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            payment.paymentMethod === 'yape'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {payment.paymentMethod.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-sm">
                          {payment.reference}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(payment.createdAt).toLocaleDateString('es-PE')}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => confirmPayment(payment.id)}
                              className="btn-primary text-sm py-1 px-3"
                            >
                              Confirmar
                            </button>
                            <button
                              onClick={() => rejectPayment(payment.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                            >
                              Rechazar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <a
              href="/admin/raffles"
              className="glass p-6 block hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-fuchsia mb-2">
                Gestión de Rifas
              </h3>
              <p className="text-gray-600 text-sm">
                Crear y administrar rifas activas
              </p>
            </a>

            <a
              href="/admin/products"
              className="glass p-6 block hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-fuchsia mb-2">
                Gestión de Productos
              </h3>
              <p className="text-gray-600 text-sm">
                Administrar productos de la tienda
              </p>
            </a>

            <a
              href="/admin/winners"
              className="glass p-6 block hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-fuchsia mb-2">
                Gestión de Ganadores
              </h3>
              <p className="text-gray-600 text-sm">
                Buscar y visualizar ganadores
              </p>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}