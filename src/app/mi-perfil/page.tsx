'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface UserData {
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
  referredBy?: {
    username: string
  }
  _count?: {
    referredTo?: number
    purchases?: number
    redemptions?: number
  }
}

interface Participation {
  id: string
  ticketNumber: number
  isWinner: boolean
  createdAt: string
  raffle: {
    title: string
    isActive: boolean
    endDate: string
  }
}

interface ReferralBonus {
  id: string
  amount: number
  level: number
  createdAt: string
  source: {
    username: string
  }
}

export default function MiPerfil() {
  const [activeTab, setActiveTab] = useState('perfil')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [participations, setParticipations] = useState<Participation[]>([])
  const [referralBonuses, setReferralBonuses] = useState<ReferralBonus[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.href = '/login'
        return
      }

      const [userRes, participationsRes, bonusesRes] = await Promise.all([
        fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/user/participations', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/user/referral-bonuses', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      if (userRes.ok) {
        const userData = await userRes.json()
        setUserData(userData)
      }

      if (participationsRes.ok) {
        const participationsData = await participationsRes.json()
        setParticipations(participationsData)
      }

      if (bonusesRes.ok) {
        const bonusesData = await bonusesRes.json()
        setReferralBonuses(bonusesData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('¡Copiado al portapapeles!')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="text-xl">Cargando...</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="text-xl text-red-600">{error || 'Error al cargar los datos'}</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const getAmbassadorLevel = (points: number) => {
    if (points >= 5000) return 'Diamante'
    if (points >= 2000) return 'Oro'
    if (points >= 1000) return 'Plata'
    return 'Bronce'
  }

  const ambassadorLevel = getAmbassadorLevel(userData.points)

  const renderTabContent = () => {
    switch (activeTab) {
      case 'perfil':
        return (
          <div className="space-y-6">
            {/* Estadísticas Generales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">{userData.tickets || 0}</div>
                <div className="text-sm opacity-90">Tickets</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">{userData.points || 0}</div>
                <div className="text-sm opacity-90">Puntos</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">{userData._count?.referredTo || 0}</div>
                <div className="text-sm opacity-90">Referidos</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">{userData._count?.purchases || 0}</div>
                <div className="text-sm opacity-90">Compras</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Usuario</label>
                    <p className="font-medium">{userData.username}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                  {userData.phone && (
                    <div>
                      <label className="text-sm text-gray-600">Teléfono</label>
                      <p className="font-medium">{userData.phone}</p>
                    </div>
                  )}
                  {userData.referredBy && (
                    <div>
                      <label className="text-sm text-gray-600">Referido por</label>
                      <p className="font-medium">{userData.referredBy.username}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm text-gray-600">Miembro desde</label>
                    <p className="font-medium">{new Date(userData.createdAt).toLocaleDateString('es-PE')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de Cuenta</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Estado de Cuenta</label>
                    <p className="font-medium">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        userData.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {userData.isActive ? 'Activa' : 'Inactiva'}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Tipo de Cuenta</label>
                    <p className="font-medium">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        userData.isAdmin
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {userData.isAdmin ? 'Administrador' : 'Usuario'}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Nivel Embajador</label>
                    <p className="font-medium text-blue-600">{ambassadorLevel}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Can Referir</label>
                    <p className="font-medium">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        userData.canRefer
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {userData.canRefer ? 'Sí' : 'No'}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Total Compras</label>
                    <p className="font-medium">{userData._count?.purchases || 0} transacciones</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Canjes Realizados</label>
                    <p className="font-medium">{userData._count?.redemptions || 0} redenciones</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Link de Invitación</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={`https://bless.com/${userData.username}`}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white"
                  />
                  <button
                    onClick={() => copyToClipboard(`https://bless.com/${userData.username}`)}
                    className="btn-primary px-4 py-2"
                  >
                    Copiar
                  </button>
                </div>
                <p className="text-sm text-blue-600">
                  Comparte este link para invitar amigos y ganar puntos
                </p>
              </div>
            </div>

            {userData.canRefer && (
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-4">Código de Invitación</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={userData.username.toUpperCase()}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white"
                    />
                    <button
                      onClick={() => copyToClipboard(userData.username.toUpperCase())}
                      className="btn-primary px-4 py-2"
                    >
                      Copiar
                    </button>
                  </div>
                  <p className="text-sm text-green-600">
                    ¡Código desbloqueado! Puedes compartirlo directamente con tus amigos
                  </p>
                </div>
              </div>
            )}

            {/* Sección de Logros */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">Mis Logros</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🎯</div>
                    <div>
                      <h4 className="font-semibold text-purple-700">Primer Compra</h4>
                      <p className="text-sm text-gray-600">
                        {(userData._count?.purchases || 0) > 0 ? '¡Completado!' : 'Pendiente'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">👥</div>
                    <div>
                      <h4 className="font-semibold text-purple-700">Primer Referido</h4>
                      <p className="text-sm text-gray-600">
                        {(userData._count?.referredTo || 0) > 0 ? '¡Completado!' : 'Pendiente'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🏆</div>
                    <div>
                      <h4 className="font-semibold text-purple-700">Embajador Bronce</h4>
                      <p className="text-sm text-gray-600">
                        {(userData._count?.referredTo || 0) >= 10 ? '¡Completado!' : `${userData._count?.referredTo || 0}/10 referidos`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">💎</div>
                    <div>
                      <h4 className="font-semibold text-purple-700">Embajador Diamante</h4>
                      <p className="text-sm text-gray-600">
                        {(userData._count?.referredTo || 0) >= 51 ? '¡Completado!' : `${userData._count?.referredTo || 0}/51 referidos`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actividad Reciente */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Actividad Reciente</h3>
              <div className="space-y-3">
                {participations.length > 0 ? (
                  participations.slice(0, 5).map((participation) => (
                    <div key={participation.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          participation.isWinner ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                        <div>
                          <p className="font-medium text-sm">Ticket #{participation.ticketNumber}</p>
                          <p className="text-xs text-gray-600">{participation.raffle.title}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-medium ${
                          participation.isWinner ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {participation.isWinner ? '¡Ganador!' : 'Participando'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(participation.createdAt).toLocaleDateString('es-PE')}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Aún no tienes participaciones en rifas
                  </p>
                )}
                {participations.length > 5 && (
                  <div className="text-center">
                    <button
                      onClick={() => setActiveTab('tickets')}
                      className="text-fuchsia hover:text-fuchsia-600 text-sm font-medium"
                    >
                      Ver todos mis tickets →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 'tickets':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Mis Participaciones</h3>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-2 px-4 font-semibold text-gray-700">Ticket</th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-700">Rifa</th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-700">Fecha</th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-700">Estado</th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-700">Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participations.map((participation) => (
                      <tr key={participation.id} className="border-b border-gray-200">
                        <td className="py-2 px-4">#{participation.ticketNumber.toString().padStart(4, '0')}</td>
                        <td className="py-2 px-4">{participation.raffle.title}</td>
                        <td className="py-2 px-4">{new Date(participation.createdAt).toLocaleDateString()}</td>
                        <td className="py-2 px-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            participation.raffle.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {participation.raffle.isActive ? 'Activo' : 'Finalizado'}
                          </span>
                        </td>
                        <td className="py-2 px-4">
                          {participation.isWinner ? (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                              ¡Ganador!
                            </span>
                          ) : participation.raffle.isActive ? (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                              Participando
                            </span>
                          ) : (
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                              No ganador
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {participations.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                          No tienes participaciones aún
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{userData.tickets}</div>
                <div className="text-sm text-blue-600">Total Tickets</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {participations.filter(p => p.raffle.isActive).length}
                </div>
                <div className="text-sm text-green-600">Tickets Activos</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {participations.filter(p => p.isWinner).length}
                </div>
                <div className="text-sm text-yellow-600">Tickets Ganadores</div>
              </div>
            </div>
          </div>
        )

      case 'equipo':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{userData._count?.referredTo || 0}</div>
                <div className="text-sm text-green-600">Referidos Directos</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {referralBonuses.filter(b => b.level === 2).length}
                </div>
                <div className="text-sm text-blue-600">Referidos Indirectos</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {referralBonuses.filter(b => b.level === 3).length}
                </div>
                <div className="text-sm text-purple-600">Referidos Terciarios</div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Bonos de Referido</h3>
              <div className="space-y-3">
                {referralBonuses.map((bonus) => (
                  <div key={bonus.id} className="flex justify-between items-center p-3 bg-white rounded">
                    <div>
                      <div className="font-medium">
                        {bonus.level === 1 ? 'Referido Directo' :
                         bonus.level === 2 ? 'Referido Indirecto' : 'Referido Terciario'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {bonus.source.username} - {new Date(bonus.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">+{bonus.amount} pts</div>
                  </div>
                ))}
                {referralBonuses.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    No tienes bonos de referido aún
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 'puntos':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-lg">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{userData.points.toLocaleString()}</div>
                <div className="text-xl">Puntos Acumulados</div>
                <div className="text-sm opacity-90 mt-2">Nivel: {ambassadorLevel}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Historial de Puntos</h3>
                <div className="space-y-3">
                  {referralBonuses.map((bonus) => (
                    <div key={bonus.id} className="flex justify-between items-center p-3 bg-white rounded">
                      <div>
                        <div className="font-medium">
                          {bonus.level === 1 ? 'Referido Directo' :
                           bonus.level === 2 ? 'Referido Indirecto' : 'Referido Terciario'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {bonus.source.username} - {new Date(bonus.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-green-600 font-semibold">+{bonus.amount}</div>
                    </div>
                  ))}
                  {referralBonuses.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                      No tienes historial de puntos aún
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Canjear Puntos</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded">
                    <div>
                      <div className="font-medium">Ticket Gratis</div>
                      <div className="text-sm text-gray-600">Para cualquier rifa</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">500 pts</span>
                      <button className="btn-primary text-sm px-3 py-1">
                        Canjear
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded">
                    <div>
                      <div className="font-medium">Bonificación 10%</div>
                      <div className="text-sm text-gray-600">En próxima compra</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">300 pts</span>
                      <button className="btn-primary text-sm px-3 py-1">
                        Canjear
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded">
                    <div>
                      <div className="font-medium">Gift Card S/50</div>
                      <div className="text-sm text-gray-600">Para tienda asociada</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">1000 pts</span>
                      <button className="btn-primary text-sm px-3 py-1">
                        Canjear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Próximo Nivel</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Progreso a nivel {ambassadorLevel === 'Diamante' ? 'Máximo' : ambassadorLevel === 'Oro' ? 'Diamante' : ambassadorLevel === 'Plata' ? 'Oro' : 'Plata'}:</span>
                  <span className="text-blue-700 font-semibold">
                    {userData.points}/{ambassadorLevel === 'Bronce' ? 1000 : ambassadorLevel === 'Plata' ? 2000 : ambassadorLevel === 'Oro' ? 5000 : '∞'} puntos
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${Math.min(100, (userData.points / (ambassadorLevel === 'Bronce' ? 1000 : ambassadorLevel === 'Plata' ? 2000 : ambassadorLevel === 'Oro' ? 5000 : 5000)) * 100)}%`
                    }}
                  ></div>
                </div>
                <p className="text-sm text-blue-600">
                  {ambassadorLevel === 'Diamante'
                    ? '¡Has alcanzado el nivel máximo!'
                    : `Necesitas ${(ambassadorLevel === 'Bronce' ? 1000 : ambassadorLevel === 'Plata' ? 2000 : ambassadorLevel === 'Oro' ? 5000 : 0) - userData.points} puntos más para alcanzar el nivel ${ambassadorLevel === 'Bronce' ? 'Plata' : ambassadorLevel === 'Plata' ? 'Oro' : 'Diamante'}`
                  }
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-fuchsia mb-2">
              Mi Perfil
            </h1>
            <p className="text-gray-600">
              Gestiona tu cuenta y revisa tus estadísticas
            </p>
          </div>

          <div className="glass rounded-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex flex-wrap">
                <button
                  onClick={() => setActiveTab('perfil')}
                  className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'perfil'
                      ? 'border-fuchsia text-fuchsia'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Mi Perfil
                </button>
                <button
                  onClick={() => setActiveTab('tickets')}
                  className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'tickets'
                      ? 'border-fuchsia text-fuchsia'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Mis Tickets
                </button>
                <button
                  onClick={() => setActiveTab('equipo')}
                  className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'equipo'
                      ? 'border-fuchsia text-fuchsia'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Mi Equipo
                </button>
                <button
                  onClick={() => setActiveTab('puntos')}
                  className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'puntos'
                      ? 'border-fuchsia text-fuchsia'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Puntos
                </button>
              </nav>
            </div>

            <div className="p-8">
              {renderTabContent()}
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="/tienda" className="btn-primary">
              Ir a Tienda de Canje
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}