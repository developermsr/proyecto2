import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Privacidad() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-fuchsia mb-4">
              Política de Privacidad
            </h1>
            <p className="text-lg text-gray-600">
              Última actualización: Septiembre 23, 2025
            </p>
          </div>

          <div className="glass p-8 rounded-lg space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                1. Compromiso con la Privacidad
              </h2>
              <p className="text-gray-700 leading-relaxed">
                En Bless, nos comprometemos a proteger la privacidad y seguridad de tus datos personales
                conforme a la Ley de Protección de Datos Personales (Ley N° 29733) y su reglamento.
                Esta política describe cómo recopilamos, usamos, almacenamos y protegemos tu información.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                2. Información que Recopilamos
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>2.1 Datos de identificación:</strong> DNI/Carnet de Extranjería, nombres completos,
                  apellidos, fecha de nacimiento, dirección domiciliaria en Perú, ciudad.
                </p>
                <p>
                  <strong>2.2 Datos de contacto:</strong> Correo electrónico, número de teléfono peruano.
                </p>
                <p>
                  <strong>2.3 Datos de cuenta:</strong> Nombre de usuario, contraseña (almacenada con hash),
                  fecha de registro, link de invitación único.
                </p>
                <p>
                  <strong>2.4 Datos de pago:</strong> Información bancaria, datos de tarjetas (procesados
                  mediante pasarelas seguras), información de transacciones en soles peruanos.
                </p>
                <p>
                  <strong>2.5 Datos de participación:</strong> Tickets comprados, rifas participadas,
                  puntos acumulados, referidos directos e indirectos, nivel de embajador.
                </p>
                <p>
                  <strong>2.6 Datos técnicos:</strong> Dirección IP, tipo de navegador, dispositivo utilizado,
                  hora de acceso, datos de navegación en la plataforma.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                3. Finalidad del Tratamiento
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>Utilizamos tus datos personales para las siguientes finalidades:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Crear y gestionar tu cuenta de usuario en la plataforma</li>
                  <li>Procesar tus pagos y transacciones en soles peruanos</li>
                  <li>Administrar tu participación en rifas y sorteos</li>
                  <li>Gestionar el sistema de referidos multinivel y puntos</li>
                  <li>Enviar notificaciones importantes sobre tu cuenta y ganancias</li>
                  <li>Mejorar nuestros servicios y experiencia de usuario</li>
                  <li>Prevenir fraudes y actividades sospechosas</li>
                  <li>Cumplir con obligaciones legales y fiscales en Perú</li>
                  <li>Enviar información sobre promociones y nuevos servicios (con tu consentimiento)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                4. Base Legal para el Tratamiento
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>El tratamiento de tus datos personales se basa en:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Consentimiento:</strong> Cuando aceptas estos términos y condiciones</li>
                  <li><strong>Contrato:</strong> Para la ejecución del contrato de servicios</li>
                  <li><strong>Obligación legal:</strong> Para cumplir con leyes peruanas</li>
                  <li><strong>Intereses legítimos:</strong> Para prevenir fraudes y garantizar la seguridad</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                5. Compartición de Información
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>5.1 Proveedores de servicios:</strong> Compartimos información con procesadores
                  de pago peruanos (Niubiz, Visa, Mastercard), servicios de hosting y otros proveedores
                  necesarios para operar la plataforma, todos con contratos de confidencialidad.
                </p>
                <p>
                  <strong>5.2 Autoridades gubernamentales:</strong> Podemos divulgar tu información cuando
                  sea requerido por ley, regulación o autoridad competente peruana.
                </p>
                <p>
                  <strong>5.3 Transferencia internacional:</strong> Los datos pueden ser transferidos a
                  servidores fuera de Perú, siempre con garantías adecuadas de protección conforme a la ley.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                6. Seguridad de los Datos
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  Implementamos medidas de seguridad técnicas y organizativas certificadas para proteger tu información:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Encriptación SSL/TLS de 256 bits para todas las transmisiones</li>
                  <li>Almacenamiento seguro de contraseñas con algoritmos PBKDF2</li>
                  <li>Firewalls y sistemas de detección de intrusos</li>
                  <li>Control de acceso basado en roles y autenticación de dos factores</li>
                  <li>Monitoreo continuo de seguridad y auditorías periódicas</li>
                  <li>Copias de seguridad encriptadas y recuperación ante desastres</li>
                  <li>Capacitación obligatoria en protección de datos para todo el personal</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                7. Derechos ARCO
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>Conforme a la Ley N° 29733, tienes derecho a:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Acceder:</strong> Conocer qué datos personales tenemos sobre ti</li>
                  <li><strong>Rectificar:</strong> Solicitar corrección de datos inexactos o desactualizados</li>
                  <li><strong>Cancelar:</strong> Solicitar eliminación de tus datos cuando no sean necesarios</li>
                  <li><strong>Oponerse:</strong> Oponerte al tratamiento de tus datos para fines específicos</li>
                </ul>
                <p>
                  <strong>¿Cómo ejercer tus derechos?</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Envía una solicitud escrita a support@bless.com</li>
                  <li>Incluye tu DNI y copia de documento de identidad</li>
                  <li>Especifica claramente el derecho que deseas ejercer</li>
                  <li>Recibirás respuesta dentro de los 30 días hábiles</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                8. Cookies y Tecnologías Similares
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  Utilizamos cookies para mejorar tu experiencia conforme a la Ley de Cookies peruana:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio</li>
                  <li><strong>Cookies de rendimiento:</strong> Nos ayudan a entender cómo usas el sitio</li>
                  <li><strong>Cookies de funcionalidad:</strong> Recuerdan tus preferencias</li>
                  <li><strong>Cookies de marketing:</strong> Muestran anuncios relevantes (con consentimiento)</li>
                </ul>
                <p>
                  Puedes configurar tu navegador para rechazar cookies, pero esto puede afectar algunas funcionalidades del sitio.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                9. Retención de Datos
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>9.1 Datos de cuenta activa:</strong> Mientras tu cuenta esté activa.
                </p>
                <p>
                  <strong>9.2 Datos de transacciones:</strong> 7 años para fines contables y tributarios (Ley Tributaria).
                </p>
                <p>
                  <strong>9.3 Datos de marketing:</strong> 2 años o hasta que te desuscribas.
                </p>
                <p>
                  <strong>9.4 Datos de rifas:</strong> 1 año después de finalizado cada sorteo.
                </p>
                <p>
                  <strong>9.5 Cuentas eliminadas:</strong> Conservamos ciertos datos por 6 meses después
                  de la eliminación para cumplir con obligaciones legales.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                10. Cambios en esta Política
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos actualizar esta política de privacidad periódicamente. Te notificaremos
                sobre cambios importantes mediante email o a través de nuestra plataforma con
                al menos 15 días de antelación a su implementación.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                11. Responsable de Datos
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Responsable del tratamiento:</strong> Bless S.A.C.
                </p>
                <p>
                  <strong>Domicilio:</strong> Lima, Perú
                </p>
                <p>
                  <strong>Email para protección de datos:</strong> <a href="mailto:dpo@bless.com" className="text-fuchsia hover:text-fuchsia-600">dpo@bless.com</a>
                </p>
                <p>
                  <strong>Teléfono:</strong> +51 123 456 789
                </p>
                <p>
                  <strong>Libro de Reclamaciones:</strong> Disponible en nuestra web y oficinas
                </p>
              </div>
            </section>

            <section className="mt-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                Aviso de Privacidad Simplificado - Perú
              </h3>
              <div className="space-y-2 text-blue-700 text-sm">
                <p>
                  <strong>Bless S.A.C.</strong> es responsable del tratamiento de tus datos personales.
                  La finalidad es gestionar tu participación en rifas, procesar pagos y administrar
                  el sistema de referidos. Tus datos serán tratados con las medidas de seguridad
                  certificadas conforme a la Ley N° 29733. Puedes ejercer tus derechos ARCO
                  escribiendo a dpo@bless.com. Para más información, solicita nuestro aviso
                  de privacidad completo.
                </p>
                <p className="mt-3 font-semibold">
                  Autoridad de Protección de Datos Personales: ARDP Perú
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}