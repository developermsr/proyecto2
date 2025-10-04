'use client'

import { useState } from 'react'
import Link from 'next/link'

interface NavigationModalProps {
  isOpen: boolean
  onClose: () => void
  isLoggedIn: boolean
  userName?: string
}

export default function NavigationModal({ isOpen, onClose, isLoggedIn, userName }: NavigationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={onClose}
      />

      {/* Modal Content - Mobile First */}
      <div className="relative bg-brand w-full max-w-sm h-full overflow-y-auto shadow-2xl">
        <div className="p-6">
          {/* Header del Modal - Optimizado para móvil */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-secondary leading-tight">
              {isLoggedIn ? `¡Bienvenido ${userName}!` : '¿Qué deseas hacer hoy?'}
            </h2>
            <button
              onClick={onClose}
              className="text-secondary text-3xl font-black hover:text-selection transition-colors leading-none"
            >
              ×
            </button>
          </div>

          {isLoggedIn ? (
            // Usuario con sesión iniciada - Mobile Optimized
            <div className="space-y-6">
              {/* Sección de Usuario */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-secondary mb-4">Mi Cuenta</h3>
                <Link href="/mi-perfil" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  📝 Mi Perfil
                </Link>
                <Link href="/mi-perfil#tickets" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  🎟️ Mis Rifas
                </Link>
                <Link href="/mi-perfil#referidos" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  👥 Mis Referidos
                </Link>
                <Link href="/mi-perfil#puntos" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  ⭐ Mis Puntos
                </Link>
              </div>

              {/* Línea Divisoria */}
              <div className="border-t-2 border-secondary opacity-20"></div>

              {/* Enlaces Generales */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-secondary mb-4">Navegación</h3>
                <Link href="/" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  🏠 Inicio
                </Link>
                <Link href="/ganadores" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  🏆 Ganadores
                </Link>
                <Link href="/preguntas-frecuentes" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  ❓ Preguntas Frecuentes
                </Link>
                <Link href="/verificar-participacion" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  🔍 Verificar mi Participación
                </Link>
                <Link href="/verificar-ganador" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  🎁 Verificar si he Ganado
                </Link>
                <Link href="/programa-embajadores" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  💼 Programa de Embajadores
                </Link>
              </div>

              {/* Botones de Acción - Mobile */}
              <div className="space-y-4 pt-6">
                <Link href="/rifas" className="block w-full">
                  <button className="btn-primary w-full text-center py-4 text-lg font-semibold">
                    Comprar Rifas
                  </button>
                </Link>
                <button className="btn-danger w-full text-center py-4 text-lg font-semibold">
                  Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            // Usuario sin sesión iniciada - Mobile Optimized
            <div className="space-y-6">
              {/* Enlaces Generales */}
              <div className="space-y-2">
                <Link href="/" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  🏠 Inicio
                </Link>
                <Link href="/ganadores" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  🏆 Ganadores
                </Link>
                <Link href="/preguntas-frecuentes" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  ❓ Preguntas Frecuentes
                </Link>
                <Link href="/verificar-participacion" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  🔍 Verificar mi Participación
                </Link>
                <Link href="/verificar-ganador" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  🎁 Verificar si he Ganado
                </Link>
                <Link href="/programa-embajadores" className="block w-full text-left py-4 px-4 text-secondary hover:bg-selection rounded-xl transition-all active:scale-95">
                  💼 Programa de Embajadores
                </Link>
              </div>

              {/* Botones de Acción - Mobile */}
              <div className="space-y-4 pt-6">
                <Link href="/login" className="block w-full">
                  <button className="btn-primary w-full text-center py-4 text-lg font-semibold">
                    Iniciar Sesión
                  </button>
                </Link>
                <Link href="/register" className="block w-full">
                  <button className="btn-success w-full text-center py-4 text-lg font-semibold">
                    Registrarse
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}