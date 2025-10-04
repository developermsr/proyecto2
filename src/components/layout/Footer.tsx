import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4">
        {/* Tarjetas sobre fondo secundario */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

          {/* Tarjeta 1: Síguenos */}
          <div className="footer-card">
            <h3 className="text-xl font-bold text-primary mb-4">Síguenos</h3>
            <p className="text-muted mb-6">
              Síguenos y entérate de todas las novedades que tenemos para ti.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="social-icon">
                📷
              </a>
              <a href="#" className="social-icon">
                f
              </a>
              <a href="#" className="social-icon">
                🎵
              </a>
            </div>
          </div>

          {/* Tarjeta 2: Contáctanos */}
          <div className="footer-card">
            <h3 className="text-xl font-bold text-primary mb-4">Contáctanos</h3>
            <div className="text-muted space-y-3">
              <p>
                <span className="font-semibold text-primary">Correo:</span><br />
                hola@blessrifas.com
              </p>
              <p>
                <span className="font-semibold text-primary">Horario:</span><br />
                L-V de 9am a 6pm<br />
                Sáb de 9am a 2pm
              </p>
            </div>
          </div>

          {/* Tarjeta 3: Transparencia */}
          <div className="footer-card">
            <h3 className="text-xl font-bold text-primary mb-4">Transparencia</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terminos" className="text-muted hover:text-brand transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-muted hover:text-brand transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/reglamento" className="text-muted hover:text-brand transition-colors">
                  Reglamento
                </Link>
              </li>
            </ul>
          </div>

          {/* Tarjeta 4: Libro de Reclamaciones y Métodos de Pago */}
          <div className="footer-card lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Libro de Reclamaciones */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Libro de Reclamaciones</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-16 bg-secondary rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">📖</span>
                  </div>
                  <p className="text-muted text-sm">
                    Tu satisfacción es nuestra prioridad.
                    Consulta nuestro libro de reclamaciones.
                  </p>
                </div>
              </div>

              {/* Métodos de Pago */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Métodos de Pago</h3>
                <div className="flex space-x-3">
                  <div className="bg-brand text-secondary px-4 py-2 rounded-lg font-semibold">
                    Yape
                  </div>
                  <div className="bg-brand text-secondary px-4 py-2 rounded-lg font-semibold">
                    Plin
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Franja inferior con derechos reservados */}
        <div className="border-t border-muted">
          <div className="text-center py-4 bg-brand">
            <p className="text-secondary font-bold">
              © BLESS RIFAS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}