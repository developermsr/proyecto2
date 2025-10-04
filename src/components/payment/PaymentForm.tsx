'use client'

import { useState } from 'react'

interface PaymentFormProps {
  amount: number
  raffleId: string
  onSuccess: () => void
  onError: (error: string) => void
}

export default function PaymentForm({ amount, raffleId, onSuccess, onError }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'plin'>('yape')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [referenceCode, setReferenceCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        onError('Debes iniciar sesión para comprar')
        return
      }

      const response = await fetch('/api/purchases/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          raffleId,
          amount,
          paymentMethod,
          phoneNumber,
          referenceCode
        })
      })

      const data = await response.json()

      if (response.ok) {
        onSuccess()
      } else {
        onError(data.error || 'Error al procesar el pago')
      }
    } catch {
      onError('Error de conexión')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="glass p-6">
      <h3 className="text-xl font-semibold text-fuchsia mb-4">
        Procesar Pago
      </h3>

      <div className="mb-6">
        <p className="text-lg font-medium text-gray-700 mb-2">
          Total a pagar: <span className="text-fuchsia font-bold">S/{amount}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Método de Pago
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('yape')}
              className={`p-4 border-2 rounded-lg text-center transition-all ${
                paymentMethod === 'yape'
                  ? 'border-fuchsia bg-fuchsia text-white'
                  : 'border-gray-300 hover:border-fuchsia'
              }`}
            >
              <div className="font-semibold">Yape</div>
              <div className="text-sm">💚</div>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('plin')}
              className={`p-4 border-2 rounded-lg text-center transition-all ${
                paymentMethod === 'plin'
                  ? 'border-fuchsia bg-fuchsia text-white'
                  : 'border-gray-300 hover:border-fuchsia'
              }`}
            >
              <div className="font-semibold">Plin</div>
              <div className="text-sm">💙</div>
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Número de Teléfono
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="912345678"
            className="input-field w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="referenceCode" className="block text-sm font-medium text-gray-700 mb-2">
            Código de Referencia
          </label>
          <input
            type="text"
            id="referenceCode"
            value={referenceCode}
            onChange={(e) => setReferenceCode(e.target.value)}
            placeholder="Últimos 6 dígitos"
            className="input-field w-full"
            required
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Instrucciones:</h4>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Abre tu app de {paymentMethod === 'yape' ? 'Yape' : 'Plin'}</li>
            <li>2. Escanea el código QR o busca el número</li>
            <li>3. Envía S/{amount}</li>
            <li>4. Ingresa el código de referencia aquí</li>
          </ol>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full"
        >
          {isSubmitting ? 'Procesando...' : 'Confirmar Pago'}
        </button>
      </form>
    </div>
  )
}