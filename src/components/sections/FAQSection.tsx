'use client'

import { useState } from 'react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      title: "Sobre mi Registro",
      content: "Información sobre el proceso de registro y requisitos para participar en las rifas."
    },
    {
      title: "Sobre los Medios de Pago",
      content: "Aceptamos Yape, Plin y transferencias bancarias para la compra de tickets."
    },
    {
      title: "Sobre el Ticket",
      content: "Cada ticket tiene un número único y te da la oportunidad de ganar los premios disponibles."
    },
    {
      title: "¿Cómo validar mi Participación?",
      content: "Puedes validar tu participación ingresando el número de tu ticket en nuestra sección de verificación."
    },
    {
      title: "Programa Emprendedor",
      content: "Únete a nuestro programa de embajadores y gana comisiones por referir nuevos participantes."
    },
    {
      title: "Garantía 100%",
      content: "Ofrecemos garantía total en todos nuestros sorteos y transacciones."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 px-4 bg-primary">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">¿Consultas?</h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center cursor-pointer">
                <h3 className="font-semibold text-secondary">{faq.title}</h3>
                <span className="text-secondary text-xl font-bold">
                  {openIndex === index ? '−' : '+'}
                </span>
              </div>
              {openIndex === index && (
                <div className="mt-3 text-secondary text-sm leading-relaxed">
                  {faq.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-brand text-lg px-8 py-4">
            ¡Quiero Participar!
          </button>
        </div>
      </div>
    </section>
  )
}