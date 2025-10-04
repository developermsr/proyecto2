'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import NavigationModal from './NavigationModal'
import ReferralBanner from '../sections/ReferralBanner'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [showReferralBanner, setShowReferralBanner] = useState(false)
  const [referrerName, setReferrerName] = useState('')

  // Simular detección de referido en URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const ref = urlParams.get('ref')
      if (ref) {
        setReferrerName(ref)
        setShowReferralBanner(true)
        // Ocultar banner después de 10 segundos
        setTimeout(() => setShowReferralBanner(false), 10000)
      }
    }
  }, [])

  // Simular estado de autenticación
  useEffect(() => {
    // Aquí iría lógica real de autenticación
    const mockUser = localStorage.getItem('user')
    if (mockUser) {
      const user = JSON.parse(mockUser)
      setIsLoggedIn(true)
      setUserName(user.name || 'Usuario')
    }
  }, [])

  return (
    <>
      {/* Banner de Referido */}
      <ReferralBanner isVisible={showReferralBanner} referrerName={referrerName} />

      <header className="sticky top-0 z-40 bg-primary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="logo-circle mr-3"></div>
              <span className="text-primary font-bold text-xl">BLESS RIFAS</span>
            </Link>

            {/* Contenido Derecho - Estados Diferentes */}
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                // Estado 1: Sin Iniciar Sesión
                <>
                  <Link href="/login" className="btn-primary hidden md:block">
                    Iniciar Sesión
                  </Link>
                  <button
                    className="menu-hamburguesa md:hidden"
                    onClick={() => setIsMenuOpen(true)}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </>
              ) : (
                // Estado 2: Con Sesión Iniciada
                <>
                  <div className="hidden md:flex items-center space-x-3">
                    <span className="text-primary font-medium">{userName}</span>
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-brand font-bold">
                        {userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button
                    className="menu-hamburguesa md:hidden"
                    onClick={() => setIsMenuOpen(true)}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navegación Desktop (Opcional para pantallas grandes) */}
        <nav className="hidden lg:block bg-secondary border-t border-brand">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8 py-3">
              <Link href="/" className="text-primary hover:text-brand transition-colors font-medium">
                Inicio
              </Link>
              <Link href="/ganadores" className="text-primary hover:text-brand transition-colors font-medium">
                Ganadores
              </Link>
              <Link href="/preguntas-frecuentes" className="text-primary hover:text-brand transition-colors font-medium">
                Preguntas Frecuentes
              </Link>
              <Link href="/verificar-participacion" className="text-primary hover:text-brand transition-colors font-medium">
                Verificar mi Participación
              </Link>
              <Link href="/verificar-ganador" className="text-primary hover:text-brand transition-colors font-medium">
                Verificar si he Ganado
              </Link>
              <Link href="/programa-embajadores" className="text-primary hover:text-brand transition-colors font-medium">
                Programa de Embajadores
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Modal de Navegación */}
      <NavigationModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />
    </>
  )
}