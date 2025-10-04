'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface ReferralStats {
  totalReferrals: number
  totalPoints: number
  level1Referrals: number
  level2Referrals: number
  level3Referrals: number
}

interface Referral {
  id: string
  username: string
  email: string
  createdAt: string
  level: number
}

export default function ReferralsPage() {
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    totalPoints: 0,
    level1Referrals: 0,
    level2Referrals: 0,
    level3Referrals: 0
  })
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [referralLink, setReferralLink] = useState('')

  useEffect(() => {
    fetchReferralData()
  }, [])

  const fetchReferralData = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch('/api/referrals/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        setReferrals(data.referrals)
        setReferralLink(`${window.location.origin}/register?ref=${data.username}`)
      }
    } catch (error) {
      console.error('Error fetching referral data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      alert('Enlace copiado al portapapeles!')
    } catch (error) {
      console.error('Error copying referral link:', error)
    }
  }

  const shareOnWhatsApp = () => {
    const message = `¡Únete a Bless con mi enlace de referido! ${referralLink}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-16 px-4">
          <div className="container mx-auto text-center">
            <p>Cargando datos de referidos...</p>
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
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-center text-fuchsia mb-12">
            Sistema de Referidos
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="glass p-6 text-center">
              <div className="text-3xl font-bold text-fuchsia mb-2">
                {stats.totalReferrals}
              </div>
              <div className="text-gray-600">Total Referidos</div>
            </div>

            <div className="glass p-6 text-center">
              <div className="text-3xl font-bold text-fuchsia mb-2">
                {stats.totalPoints}
              </div>
              <div className="text-gray-600">Puntos Ganados</div>
            </div>

            <div className="glass p-6 text-center">
              <div className="text-3xl font-bold text-fuchsia mb-2">
                {stats.level1Referrals}
              </div>
              <div className="text-gray-600">Nivel 1</div>
            </div>

            <div className="glass p-6 text-center">
              <div className="text-3xl font-bold text-fuchsia mb-2">
                {stats.level2Referrals + stats.level3Referrals}
              </div>
              <div className="text-gray-600">Niveles 2-3</div>
            </div>
          </div>

          <div className="glass p-8 mb-12">
            <h2 className="text-2xl font-bold text-fuchsia mb-6">
              Tu Enlace de Referido
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="input-field flex-grow"
              />
              <button
                onClick={copyReferralLink}
                className="btn-secondary"
              >
                Copiar Enlace
              </button>
              <button
                onClick={shareOnWhatsApp}
                className="btn-primary"
              >
                Compartir WhatsApp
              </button>
            </div>
          </div>

          <div className="glass p-8">
            <h2 className="text-2xl font-bold text-fuchsia mb-6">
              Tus Referidos
            </h2>

            {referrals.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                Aún no tienes referidos. ¡Comparte tu enlace y empieza a ganar puntos!
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Usuario</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Nivel</th>
                      <th className="text-left py-3 px-4">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((referral) => (
                      <tr key={referral.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium">
                          {referral.username}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {referral.email}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            referral.level === 1
                              ? 'bg-green-100 text-green-800'
                              : referral.level === 2
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            Nivel {referral.level}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(referral.createdAt).toLocaleDateString('es-PE')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="glass p-8 mt-12">
            <h2 className="text-2xl font-bold text-fuchsia mb-6">
              Cómo Funciona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl text-fuchsia mb-4">🎯</div>
                <h3 className="font-semibold mb-2">Nivel 1</h3>
                <p className="text-gray-600 text-sm">
                  Gana 100 puntos por cada referido directo que compre una rifa.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl text-fuchsia mb-4">🎯</div>
                <h3 className="font-semibold mb-2">Nivel 2</h3>
                <p className="text-gray-600 text-sm">
                  Gana 50 puntos por cada referido de tus referidos.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl text-fuchsia mb-4">🎯</div>
                <h3 className="font-semibold mb-2">Nivel 3</h3>
                <p className="text-gray-600 text-sm">
                  Gana 25 puntos por cada referido de nivel 3.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}