import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Terminos() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-fuchsia mb-4">
              Términos y Condiciones
            </h1>
            <p className="text-lg text-gray-600">
              Última actualización: Septiembre 23, 2025
            </p>
          </div>

          <div className="glass p-8 rounded-lg space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                1. Aceptación de los Términos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Al registrarte y utilizar la plataforma Bless, aceptas estos términos y condiciones en su totalidad.
                Si no estás de acuerdo con alguno de estos términos, no puedes utilizar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                2. Requisitos de Participación
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>2.1 Edad y residencia:</strong> Es obligatorio que el Participante registrado sea mayor de edad (18 años)
                  y domiciliado en el Perú. No se aceptarán participantes de otros países.
                </p>
                <p>
                  <strong>2.2 Identificación válida:</strong> Los datos en el registro tienen que ser de acuerdo al DNI o Carnet de Extranjería
                  vigente. No se permite registrar datos de menores de edad, personas fallecidas o terceros sin consentimiento.
                </p>
                <p>
                  <strong>2.3 Verificación de identidad:</strong> Bless se reserva el derecho de verificar la identidad de los participantes
                  en cualquier momento. La presentación de DNI original es obligatoria para reclamar premios.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                3. Descripción del Servicio
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Bless es una plataforma online que permite a los usuarios participar en rifas con premios en efectivo,
                acumular puntos a través de un sistema de referidos multinivel, y canjear puntos por productos y recompensas.
                El precio de cada ticket de rifa es de S/5 (cinco soles peruanos).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                4. Registro y Cuenta de Usuario
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>4.1 Datos requeridos:</strong> DNI/Carnet de Extranjería, nombres completos, apellidos,
                  país (Perú), ciudad, correo electrónico, nombre de usuario (máximo 20 caracteres) y contraseña.
                </p>
                <p>
                  <strong>4.2 Link de invitación:</strong> Con el nombre de usuario se creará un link único
                  (www.bless.com/tuusuario) para el sistema de referidos.
                </p>
                <p>
                  <strong>4.3 Código de invitación:</strong> Se desbloquea únicamente cuando el usuario compra 3 rifas al mes.
                </p>
                <p>
                  <strong>4.4 Responsabilidad de la cuenta:</strong> Eres responsable de mantener la confidencialidad
                  de tu contraseña y de todas las actividades que ocurran en tu cuenta.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                5. Participación en Rifas
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>5.1 Precio de tickets:</strong> Cada ticket tiene un costo de S/5 y se añade a la lista de participantes.
                </p>
                <p>
                  <strong>5.2 Sorteo:</strong> El sorteo se transmitirá en vivo a través de Instagram @bless_peru el día 11/11/25 a las 8:00 PM.
                  No es necesario estar presente en la transmisión para ganar.
                </p>
                <p>
                  <strong>5.3 Sistema de tickets:</strong> Cada ticket es una opción en &quot;La lista de Participantes&quot;.
                  Si compras múltiples tickets, se añadirán múltiples veces a la lista. Los tickets ganadores son eliminados
                  de la lista para premios futuros, pero los tickets no ganadores continúan participando.
                </p>
                <p>
                  <strong>5.4 Garantía de realización:</strong> Para la realización de la rifa es necesario la venta mínima
                  de 1000 tickets. Si no se alcanza esta meta, el organizador podrá reprogramar la rifa hasta 15 días.
                  Si no se reprograma, se devolverá el dinero a todos los participantes.
                </p>
                <p>
                  <strong>5.5 Selección de ganadores:</strong> Los ganadores se seleccionan de manera aleatoria y transparente.
                  Cada ticket tiene igual probabilidad de ganar.
                </p>
                <p>
                  <strong>5.6 Entrega de premios:</strong> Los ganadores serán contactados dentro de las 72 horas siguientes.
                  Es necesario llenar y firmar un documento y presentar DNI original para reclamar el premio.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                6. Sistema de Referidos y Programa de Embajadores
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>6.1 Niveles de comisión:</strong> El sistema opera con 3 niveles de comisiones:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Nivel 1 (Directos): 20% de comisión</li>
                  <li>Nivel 2 (Indirectos): 10% de comisión</li>
                  <li>Nivel 3 (Terciarios): 5% de comisión</li>
                </ul>
                <p>
                  <strong>6.2 Niveles de embajador:</strong> Bronce (0-10 referidos), Plata (11-25), Oro (26-50), Diamante (51+).
                </p>
                <p>
                  <strong>6.3 Puntos y recompensas:</strong> Los puntos se acumulan por registros de referidos y sus compras.
                  Los puntos pueden canjearse en la tienda exclusiva por tickets gratis, productos y otros beneficios.
                </p>
                <p>
                  <strong>6.4 Vigencia de puntos:</strong> Los puntos tienen una vigencia de 12 meses desde su obtención.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                7. Prohibiciones
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>Queda estrictamente prohibido:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Crear múltiples cuentas por la misma persona</li>
                  <li>Registrar datos de menores de edad o personas fallecidas</li>
                  <li>Utilizar métodos fraudulentos para obtener referidos</li>
                  <li>Compartir cuentas de usuario con terceros</li>
                  <li>Intentar hackear o comprometer la seguridad de la plataforma</li>
                  <li>Difamar, acosar o amenazar a otros usuarios</li>
                  <li>Realizar spam o prácticas de marketing engañosas</li>
                  <li>Participar si resides fuera del Perú</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                8. Pagos y Precios
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>8.1 Métodos de pago:</strong> Aceptamos transferencia bancaria, tarjetas de débito/crédito, Yape y Plin.
                </p>
                <p>
                  <strong>8.2 Moneda:</strong> Todos los precios están en soles peruanos (S/).
                </p>
                <p>
                  <strong>8.3 Impuestos:</strong> Todos los precios incluyen impuestos aplicables según la legislación peruana.
                </p>
                <p>
                  <strong>8.4 Reembolsos:</strong> Los tickets de rifa no son reembolsables, excepto en caso de cancelación
                  de la rifa por no alcanzar la meta mínima de ventas.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                9. Premios y Entrega
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>9.1 No transferibles:</strong> Los premios no son transferibles ni canjeables por efectivo.
                </p>
                <p>
                  <strong>9.2 Plazo de reclamo:</strong> Si el ganador no responde dentro de 7 días hábiles al intento de contacto,
                  se realizará un nuevo sorteo para ese premio.
                </p>
                <p>
                  <strong>9.3 Documentación:</strong> Para reclamar premios es obligatorio presentar DNI original,
                  llenar y firmar el documento de recepción correspondiente.
                </p>
                <p>
                  <strong>9.4 Publicación de ganadores:</strong> La lista oficial de ganadores se publicará en la sección
                  &quot;GANADORES&quot; de la web y en todas las redes sociales oficiales.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                10. Limitación de Responsabilidad
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Bless no será responsable por daños directos, indirectos, incidentales, especiales o consecuentes que
                resulten del uso o la imposibilidad de uso de nuestros servicios, incluyendo但不限于 lucro cesante,
                pérdida de datos o daños a dispositivos, excepto en los casos expresamente previstos por la ley peruana.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                11. Modificaciones de los Términos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Bless se reserva el derecho de modificar estos términos y condiciones en cualquier momento.
                Las modificaciones entrarán en vigor inmediatamente después de su publicación en la plataforma.
                El uso continuado del servicio constituye aceptación de los términos modificados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                12. Terminación del Servicio
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Bless puede suspender o terminar tu cuenta en cualquier momento por violación de estos términos,
                actividad fraudulenta, o cualquier otra razón que considere perjudicial para la plataforma u otros usuarios.
                En caso de terminación, se perderán todos los puntos acumulados no canjeados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                13. Ley Aplicable y Jurisdicción
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Estos términos y condiciones se rigen por las leyes de la República del Perú. Cualquier disputa
                que surja de estos términos será resuelta en los tribunales competentes de la ciudad de Lima,
                renunciando expresamente a cualquier otra jurisdicción que pudiera corresponder.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                14. Protección al Consumidor
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>14.1 Libro de Reclamaciones:</strong> Contamos con un Libro de Reclamaciones virtual disponible
                  para cualquier consulta o reclamo según las normas de INDECOPI.
                </p>
                <p>
                  <strong>14.2 Derecho ARCO:</strong> Los usuarios tienen derecho a Acceder, Rectificar, Cancelar
                  y Oponerse al tratamiento de sus datos personales conforme a la Ley de Protección de Datos Personales.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                15. Contacto
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Si tienes alguna pregunta sobre estos términos y condiciones, contáctanos:
              </p>
              <div className="space-y-1 text-gray-700">
                <p>Email: <a href="mailto:support@bless.com" className="text-fuchsia hover:text-fuchsia-600">support@bless.com</a></p>
                <p>Teléfono: +51 123 456 789</p>
                <p>Dirección: Lima, Perú</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}