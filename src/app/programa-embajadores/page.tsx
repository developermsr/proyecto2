import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function ProgramaEmbajadores() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-fuchsia mb-4">
              Programa de Embajadores
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conviértete en embajador de Bless y gana increíbles recompensas por compartir nuestra plataforma con amigos y familiares
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="glass p-8 rounded-lg text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-fuchsia mb-3">Gana Puntos</h3>
              <p className="text-gray-600">
                Acumula puntos por cada referido que se registre y participe en nuestras rifas
              </p>
            </div>
            <div className="glass p-8 rounded-lg text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-fuchsia mb-3">Comisiones</h3>
              <p className="text-gray-600">
                Recibe comisiones del 20% por las compras de tus referidos directos
              </p>
            </div>
            <div className="glass p-8 rounded-lg text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-fuchsia mb-3">Premios Exclusivos</h3>
              <p className="text-gray-600">
                Accede a premios especiales y reconocimientos por tu desempeño como embajador
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-fuchsia mb-6">
                ¿Cómo Funciona?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-fuchsia-100 text-fuchsia-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mt-1">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Regístrate</h3>
                    <p className="text-gray-600">Crea tu cuenta en Bless y obtén tu link de invitación único</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-fuchsia-100 text-fuchsia-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mt-1">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Comparte tu Link</h3>
                    <p className="text-gray-600">Invita a amigos y familiares usando tu link personal</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-fuchsia-100 text-fuchsia-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mt-1">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Gana Recompensas</h3>
                    <p className="text-gray-600">Recibe puntos y comisiones por cada referido activo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-fuchsia-100 text-fuchsia-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mt-1">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Canjea Premios</h3>
                    <p className="text-gray-600">Usa tus puntos en nuestra tienda de canje exclusiva</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-fuchsia mb-6">
                Sistema de Recompensas
              </h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Referidos Directos (Nivel 1)</h3>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• 100 puntos por registro completado</li>
                    <li>• 20% de comisión en sus compras</li>
                    <li>• 50 puntos adicionales por primera compra</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Referidos Indirectos (Nivel 2)</h3>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• 50 puntos por registro completado</li>
                    <li>• 10% de comisión en sus compras</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Referidos Terciarios (Nivel 3)</h3>
                  <ul className="text-purple-700 space-y-1 text-sm">
                    <li>• 25 puntos por registro completado</li>
                    <li>• 5% de comisión en sus compras</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold text-fuchsia mb-6 text-center">
              Niveles de Embajador
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-gray-100 rounded-lg p-6 mb-3">
                  <h3 className="font-bold text-gray-800">Bronce</h3>
                  <p className="text-3xl font-bold text-gray-600 my-2">🥉</p>
                  <p className="text-sm text-gray-600">0-10 referidos</p>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Acceso básico</li>
                  <li>• 5% bonificación</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-gray-200 rounded-lg p-6 mb-3">
                  <h3 className="font-bold text-gray-800">Plata</h3>
                  <p className="text-3xl font-bold text-gray-600 my-2">🥈</p>
                  <p className="text-sm text-gray-600">11-25 referidos</p>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Acceso avanzado</li>
                  <li>• 10% bonificación</li>
                  <li>• Soporte prioritario</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 rounded-lg p-6 mb-3">
                  <h3 className="font-bold text-yellow-800">Oro</h3>
                  <p className="text-3xl font-bold text-yellow-600 my-2">🥇</p>
                  <p className="text-sm text-yellow-700">26-50 referidos</p>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Acceso VIP</li>
                  <li>• 15% bonificación</li>
                  <li>• Premios exclusivos</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-yellow-200 rounded-lg p-6 mb-3">
                  <h3 className="font-bold text-yellow-800">Diamante</h3>
                  <p className="text-3xl font-bold text-yellow-600 my-2">💎</p>
                  <p className="text-sm text-yellow-700">51+ referidos</p>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Acceso Elite</li>
                  <li>• 20% bonificación</li>
                  <li>• Todos los beneficios</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-fuchsia mb-6">
                Tienda de Canje Exclusiva
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">🎫</div>
                  <div>
                    <h4 className="font-semibold">Tickets Gratis</h4>
                    <p className="text-sm text-gray-600">500 puntos = 1 ticket gratis</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">📱</div>
                  <div>
                    <h4 className="font-semibold">Smartphones</h4>
                    <p className="text-sm text-gray-600">Desde 5,000 puntos</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">💻</div>
                  <div>
                    <h4 className="font-semibold">Laptops</h4>
                    <p className="text-sm text-gray-600">Desde 10,000 puntos</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">🎮</div>
                  <div>
                    <h4 className="font-semibold">Videojuegos</h4>
                    <p className="text-sm text-gray-600">Desde 1,000 puntos</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-fuchsia mb-6">
                Beneficios Adicionales
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Panel de Control Personal</h3>
                    <p className="text-sm text-gray-600">Seguimiento en tiempo real de tus referidos y comisiones</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Material de Marketing</h3>
                    <p className="text-sm text-gray-600">Acceso a banners, imágenes y contenido promocional</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Entrenamiento Gratuito</h3>
                    <p className="text-sm text-gray-600">Tutoriales y estrategias para maximizar tus ganancias</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Comunidad Exclusiva</h3>
                    <p className="text-sm text-gray-600">Acceso a grupos privados con otros embajadores</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Eventos Especiales</h3>
                    <p className="text-sm text-gray-600">Invitaciones a eventos exclusivos para embajadores</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
              Términos y Condiciones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-700">
              <div>
                <h3 className="font-semibold mb-2">Requisitos para ser Embajador:</h3>
                <ul className="space-y-1">
                  <li>• Ser mayor de 18 años</li>
                  <li>• Tener cuenta activa en Bless</li>
                  <li>• Residir en Perú</li>
                  <li>• Comprar al menos 3 rifas al mes para desbloquear código</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Reglas del Programa:</h3>
                <ul className="space-y-1">
                  <li>• Prohibido spam o prácticas fraudulentas</li>
                  <li>• Los puntos tienen vigencia de 12 meses</li>
                  <li>• Las comisiones se pagan mensualmente</li>
                  <li>• Bless puede modificar el programa previo aviso</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-fuchsia mb-4">
              ¿Listo para ser Embajador?
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Únete al programa más exitoso de referidos y comienza a ganar increíbles recompensas hoy mismo
            </p>
            <div className="flex justify-center space-x-4">
              {false ? (
                <button className="btn-primary text-lg">
                  Ir a mi Panel de Embajador
                </button>
              ) : (
                <a href="/register" className="btn-primary text-lg">
                  Registrarme como Embajador
                </a>
              )}
              <a href="/contacto" className="btn-secondary text-lg">
                Más Información
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}