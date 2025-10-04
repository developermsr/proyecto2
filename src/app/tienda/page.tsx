'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface Product {
  id: string
  name: string
  description: string
  points: number
  stock: number
  image?: string
  isActive: boolean
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [userPoints, setUserPoints] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStoreData()
  }, [])

  const fetchStoreData = async () => {
    try {
      const token = localStorage.getItem('token')

      const [productsResponse, userResponse] = await Promise.all([
        fetch('/api/store/products'),
        token ? fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        }) : Promise.resolve(null)
      ])

      if (productsResponse.ok) {
        const productsData = await productsResponse.json()
        setProducts(productsData)
      }

      if (userResponse?.ok) {
        const userData = await userResponse.json()
        setUserPoints(userData.points)
      }
    } catch (error) {
      console.error('Error fetching store data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRedeem = async (productId: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Debes iniciar sesión para canjear productos')
        return
      }

      const response = await fetch('/api/store/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity: 1 })
      })

      const data = await response.json()

      if (response.ok) {
        alert('¡Canje exitoso! Te contactaremos pronto.')
        fetchStoreData()
      } else {
        alert(data.error || 'Error al canjear producto')
      }
    } catch (error) {
      console.error('Error redeeming product:', error)
      alert('Error de conexión')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-16 px-4">
          <div className="container mx-auto text-center">
            <p>Cargando tienda...</p>
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-fuchsia mb-4">
              Tienda de Recompensas
            </h1>
            <div className="glass inline-block px-6 py-3">
              <span className="text-lg font-semibold text-gray-700">
                Tus puntos:
              </span>
              <span className="text-2xl font-bold text-fuchsia ml-2">
                {userPoints}
              </span>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No hay productos disponibles en este momento.</p>
              <p className="text-gray-500 mt-4">Vuelve pronto para nuevas recompensas!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="glass p-6 hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-4xl text-gray-400">🎁</span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {product.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-fuchsia font-bold text-lg">
                        {product.points} pts
                      </span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        product.stock > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleRedeem(product.id)}
                      disabled={userPoints < product.points || product.stock === 0}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                        userPoints >= product.points && product.stock > 0
                          ? 'btn-primary'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {userPoints < product.points
                        ? 'Puntos insuficientes'
                        : product.stock === 0
                        ? 'Agotado'
                        : 'Canjear'
                      }
                    </button>
                  </div>
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