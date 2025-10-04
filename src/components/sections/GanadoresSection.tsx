import Link from 'next/link'

export default function GanadoresSection() {
  return (
    <section className="py-16 px-4 bg-primary">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold text-primary mb-8">
          Aún estamos a tiempo, ¡sé el próximo ganador!
        </h2>

        <Link href="/register">
          <button className="btn-brand text-lg px-8 py-4">
            Regístrate
          </button>
        </Link>
      </div>
    </section>
  )
}