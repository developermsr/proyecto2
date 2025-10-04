import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function PreguntasFrecuentes() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-fuchsia mb-4">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg text-gray-600">
              Encuentra respuestas a las preguntas más comunes sobre Bless
            </p>
          </div>

          <div className="space-y-6">
            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-fuchsia mb-3">
                Sobre mi Registro
              </h2>
              <p className="text-gray-700 mb-3">
                <strong>¿Qué requisitos necesito para registrarme?</strong>
              </p>
              <p className="text-gray-600 leading-relaxed">
                Es obligatorio que el Participante registrado sea mayor de edad y domiciliado en el Perú.
                Los datos en el registro tienen que ser de acuerdo al DNI o Carnet de Extranjería.
                Por favor, no colocar nombre de tus hijos o de alguna persona fallecida porque no se
                le considerará como ganador. Puedes utilizar el nombre de usuario para colocar cualquier nombre.
              </p>
            </div>

            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-fuchsia mb-3">
                ¿Cómo validar mi Participación?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Completado tu registro y pago de tus tickets es necesario esperar un tiempo prudente
                para validar tu pago. Lo ideal es hacer la validación después de 24 horas de realizado
                el pago. Para validar la Lista de Participantes de este sorteo, haz click
                <a href="/verificar-participacion" className="text-fuchsia hover:text-fuchsia-600"> aquí</a>.
              </p>
            </div>

            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-fuchsia mb-3">
                Sobre la Rifa
              </h2>
              <p className="text-gray-600 leading-relaxed">
                El precio de cada ticket es de S/5 y se te añadirá a la lista del sorteo.
                El sorteo se transmitirá a través de nuestra página de Instagram "bless_peru"
                el día 11/11/25 a las 8 PM. No es necesario estar conectado en la transmisión
                para considerarte como ganador.
              </p>
            </div>

            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-fuchsia mb-3">
                Sobre el Ticket
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Cada ticket es una opción añadida a &quot;La lista de Participantes&quot; (una fila en excell).
                El ticket ganador será eliminado de la lista. Ejemplo: Si compras 3 rifas se te
                añadirá 3 veces a la lista, y si uno de ellos es el ganador, éste será eliminado
                de la lista, pero las otros dos tickets seguirán participando por los demás premios restantes.
              </p>
            </div>

            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-fuchsia mb-3">
                Sobre el Ganador
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Si eres ganador de uno de nuestros premios nos pondremos en contacto contigo en el
                Plazo máximo de 72 horas. Es necesario llenar y firmar el documento que te enviaremos
                para otorgarte tu premio. Además, la lista de Ganadores se publicará en esta misma
                web en la opción &quot;GANADORES&quot; y en todas nuestras redes sociales.
              </p>
            </div>

            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-fuchsia mb-3">
                ¿Cómo validar si soy Ganador?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Para validar si eres uno de nuestros ganadores haz clic
                <a href="/verificar-ganador" className="text-fuchsia hover:text-fuchsia-600"> aquí</a>.
              </p>
            </div>

            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-fuchsia mb-3">
                Programa Embajador
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Bless te brinda la oportunidad de convertirte en Embajador de su marca y GANAR PUNTOS
                por recomendar sus rifas con tus amigos y familiares.
                <a href="/programa-embajadores" className="text-fuchsia hover:text-fuchsia-600"> Conoce más aquí</a>.
              </p>
            </div>

            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-fuchsia mb-3">
                Garantía 100%
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Para la realización de esta rifa es necesario la venta mínima de mil tickets, si no
                se llega a meta el ORGANIZADOR podrá reprogramar la rifa hasta un plazo máximo de 15 días,
                en caso no se reprograme, el organizador tendrá que devolver el dinero.
              </p>
            </div>

            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-fuchsia mb-3">
                Métodos de Pago
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Aceptamos pagos mediante:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                <li>Transferencia bancaria</li>
                <li>Tarjetas de débito y crédito</li>
                <li>Yape</li>
                <li>Plin</li>
              </ul>
            </div>

            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-fuchsia mb-3">
                Sistema de Referidos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Cada usuario registrado obtiene un link único de invitación (www.bless.com/tu-usuario).
                Cuando alguien se registra a través de tu link, aparece automáticamente como "Invitado por: tu-usuario"
                en el formulario de registro. Además, el nuevo usuario ve un mensaje de descuento del 20%
                en la parte superior de la web mientras navega.
              </p>
            </div>

            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-fuchsia mb-3">
                ¿Cómo funciona el código de invitación?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                El código de invitación aparece bloqueado en tu perfil y será desbloqueado únicamente
                para los usuarios que compren 3 rifas al mes. Este código te permite compartirlo
                directamente con tus amigos para que puedan registrarse con tu referido.
              </p>
            </div>

            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-fuchsia mb-3">
                ¿Puedo participar si vivo fuera de Perú?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                No, por razones legales y logísticas, solo pueden participar personas mayores de edad
                que estén domiciliadas en el Perú y cuenten con DNI o Carnet de Extranjería válido.
              </p>
            </div>

            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-fuchsia mb-3">
                ¿Qué pasa si gano y no respondo al contacto?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Si el ganador no responde dentro de los 7 días hábiles posteriores al intento de contacto,
                se realizará un nuevo sorteo para seleccionar un nuevo ganador para ese premio.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              ¿No encontraste lo que buscabas?
            </p>
            <div className="flex justify-center space-x-4">
              <a href="/contacto" className="btn-primary">
                Contáctanos
              </a>
              <a href="/ayuda" className="btn-secondary">
                Centro de Ayuda
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}