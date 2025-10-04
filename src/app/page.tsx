import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AuspiciadoresSection from '@/components/sections/AuspiciadoresSection'
import GanadoresSection from '@/components/sections/GanadoresSection'
import SorteoPendienteSection from '@/components/sections/SorteoPendienteSection'
import FAQSection from '@/components/sections/FAQSection'
import AuspiciadoresInvitacionSection from '@/components/sections/AuspiciadoresInvitacionSection'
import BlessSection from '@/components/sections/BlessSection'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Sección Principal - Rifa Actual */}
        <section className="py-20 px-4 bg-primary">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-black text-primary mb-6">
                Rifa Nº 1
              </h1>
              <p className="text-xl text-muted mb-12 max-w-2xl mx-auto font-medium">
                Si hoy compras tu ticket, podrías ser el próximo ganador de estos premios
              </p>

              {/* Tarjeta de Premios - Diseño Minimalista */}
              <div className="premios-card max-w-lg mx-auto mb-12">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="text-2xl mr-3">🏆</span>
                      <span className="font-bold">1er Premio</span>
                    </span>
                    <span className="font-black text-lg">S/ 200.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="text-2xl mr-3">🥈</span>
                      <span className="font-bold">2do Premio</span>
                    </span>
                    <span className="font-black text-lg">S/ 100.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="text-2xl mr-3">🥉</span>
                      <span className="font-bold">3er Premio</span>
                    </span>
                    <span className="font-black text-lg">S/ 50.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="text-xl mr-3">🎖️</span>
                      <span className="font-bold">10 Premios de S/ 20.00</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="text-xl mr-3">🎖️</span>
                      <span className="font-bold">10 Premios de S/ 10.00</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="text-xl mr-3">🎁</span>
                      <span className="font-bold">10 Premios Sorpresa</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Información del sorteo - Diseño Limpio */}
              <div className="space-y-3 mb-12">
                <p className="text-primary font-semibold text-lg">
                  📅 Fecha del sorteo: 11/11/25
                </p>
                <p className="text-primary font-semibold text-lg">
                  💰 Precio del Ticket: S/ 8.00
                </p>
                <p className="text-primary font-semibold text-lg">
                  📱 Transmisión en Instagram Live
                </p>
              </div>

              {/* Botón principal - Call to Action */}
              <button className="btn-brand text-xl px-12 py-6 mb-8 font-black">
                ¡Quiero Participar!
              </button>

              <p className="text-muted text-sm font-medium">
                Puedes comprar tu ticket con Yape, Plin y Transferencia.
              </p>
            </div>
          </div>
        </section>

        {/* Scroll Vertical Modular con Fondos Alternantes */}

        {/* Auspiciadores - Fondo Amarillo Pálido */}
        <AuspiciadoresSection />

        {/* Ganadores - Fondo Negro Carbón */}
        <GanadoresSection />

        {/* Sorteo Pendiente - Fondo Amarillo Pálido */}
        <SorteoPendienteSection />

        {/* FAQ - Fondo Negro Carbón */}
        <FAQSection />

        {/* Invitación a Auspiciadores - Fondo Amarillo Pálido */}
        <AuspiciadoresInvitacionSection />

        {/* Sección Bless Rifas - Fondo Amarillo */}
        <BlessSection />
      </main>

      <Footer />
    </div>
  )
}
