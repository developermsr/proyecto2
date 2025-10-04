import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Ayuda() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-fuchsia mb-4">
              Centro de Ayuda
            </h1>
            <p className="text-lg text-gray-600">
              Encuentra respuestas a tus preguntas sobre cómo funciona Bless
            </p>
          </div>

          <div className="space-y-8">
            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                Sobre mi Registro
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>¿Qué requisitos necesito para registrarme?</strong> Es obligatorio que el Participante registrado sea mayor de edad y domiciliado en el Perú. Los datos en el registro tienen que ser de acuerdo al DNI o Carnet de Extranjería.
                </p>
                <p>
                  <strong>¿Puedo usar nombre de otras personas?</strong> No, por favor no colocar nombre de tus hijos o de alguna persona fallecida porque no se le considerará como ganador. Puedes utilizar el nombre de usuario para colocar cualquier nombre.
                </p>
                <p>
                  <strong>¿Cuál es el límite del nombre de usuario?</strong> El nombre de usuario puede tener máximo 20 caracteres y se usará para crear tu link de invitación único.
                </p>
              </div>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                Sistema de Referidos y Links de Invitación
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>¿Cómo funciona el link de invitación?</strong> Con tu nombre de usuario se creará un link único: www.bless.com/tuusuario. Al abrir este link, aparece una barra superior con el mensaje: "Disfruta de este descuento especial del 20% por tuusuario".
                </p>
                <p>
                  <strong>¿Cómo se mantiene el referido?</strong> El nombre de usuario aparece automáticamente en la opción "Invitado por" del registro y permanece mientras el usuario navega por el sitio.
                </p>
                <p>
                  <strong>¿Qué es el código de invitación?</strong> Es un código bloqueado que se desbloquea solo cuando compras 3 rifas al mes. Puedes compartirlo directamente con amigos para que se registren.
                </p>
                <p>
                  <strong>Niveles de comisión:</strong> Ganas comisiones por referidos directos (20%), indirectos (10%) y terciarios (5%).
                </p>
              </div>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                Rifas y Premios
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>¿Cuánto cuesta cada ticket?</strong> El precio de cada ticket es de S/5 y se te añadirá a la lista del sorteo.
                </p>
                <p>
                  <strong>¿Cuándo es el sorteo?</strong> El sorteo se transmitirá a través de nuestra página de Instagram "bless_peru" el día 11/11/25 a las 8 PM.
                </p>
                <p>
                  <strong>¿Es necesario estar en la transmisión?</strong> No es necesario estar conectado en la transmisión para considerarte como ganador.
                </p>
                <p>
                  <strong>¿Cómo funcionan los tickets?</strong> Cada ticket es una opción añadida a "La lista de Participantes". Si compras 3 rifas se te añadirá 3 veces a la lista. Si uno de ellos es el ganador, éste será eliminado de la lista, pero los otros dos tickets seguirán participando.
                </p>
              </div>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                Proceso para Ganadores
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>¿Cuándo me contactan si gano?</strong> Si eres ganador, nos pondremos en contacto contigo en el plazo máximo de 72 horas.
                </p>
                <p>
                  <strong>¿Qué necesito para reclamar mi premio?</strong> Es necesario llenar y firmar el documento que te enviaremos para otorgarte tu premio. Debes presentar tu DNI original.
                </p>
                <p>
                  <strong>¿Dónde se publican los ganadores?</strong> La lista de Ganadores se publicará en la web en la opción "GANADORES" y en todas nuestras redes sociales.
                </p>
                <p>
                  <strong>¿Los premios son transferibles?</strong> No, los premios no son transferibles ni canjeables por efectivo.
                </p>
              </div>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                Garantía y Condiciones
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>¿Hay garantía de que se realice la rifa?</strong> Para la realización de esta rifa es necesario la venta mínima de mil tickets.
                </p>
                <p>
                  <strong>¿Qué pasa si no se alcanza la meta?</strong> Si no se llega a la meta, el ORGANIZADOR podrá reprogramar la rifa hasta un plazo máximo de 15 días. En caso no se reprograme, el organizador tendrá que devolver el dinero.
                </p>
                <p>
                  <strong>¿Cómo valido mi participación?</strong> Completado tu registro y pago de tus tickets, espera 24 horas y luego verifica en la sección "Verificar mi Participación".
                </p>
                <p>
                  <strong>¿Cómo sé si gané?</strong> Puedes verificar si eres ganador en la sección "Verificar si he ganado" ingresando tu DNI.
                </p>
              </div>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                Programa de Embajadores
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>¿Qué es el programa de embajadores?</strong> Bless te brinda la oportunidad de convertirte en Embajador de su marca y GANAR PUNTOS por recomendar sus rifas con tus amigos y familiares.
                </p>
                <p>
                  <strong>¿Cuáles son los niveles de embajador?</strong> Existen 4 niveles: Bronce (0-10 referidos), Plata (11-25), Oro (26-50) y Diamante (51+ referidos).
                </p>
                <p>
                  <strong>¿Qué beneficios tengo como embajador?</strong> Acceso a tienda de canje exclusiva, comisiones por niveles, material de marketing, entrenamiento gratuito y comunidad exclusiva.
                </p>
              </div>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-fuchsia mb-4">
                Métodos de Pago y Seguridad
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>¿Qué métodos de pago aceptan?</strong> Aceptamos transferencia bancaria, tarjetas de débito y crédito, Yape y Plin.
                </p>
                <p>
                  <strong>¿Es seguro usar Bless?</strong> Sí, utilizamos encriptación SSL y seguimos las mejores prácticas de seguridad para proteger tu información.
                </p>
                <p>
                  <strong>¿Puedo participar si vivo fuera de Perú?</strong> No, solo pueden participar personas mayores de edad que estén domiciliadas en el Perú y cuenten con DNI o Carnet de Extranjería válido.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-4">
              ¿No encontraste lo que buscabas?
            </p>
            <a href="/contacto" className="btn-primary">
              Contáctanos
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}