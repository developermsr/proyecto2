import Link from 'next/link'

export default function BlessSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="brand-section">
          <div className="brand-circle"></div>
          <div className="brand-content">
            <h2 className="text-4xl font-black text-primary mb-6">
              BLESS RIFAS
            </h2>
            <p className="text-primary text-lg mb-8 max-w-2xl mx-auto font-medium">
              Hemos transformado las Rifas Online en una verdadera oportunidad para ganar dinero real.
            </p>

            <Link href="/register">
              <button className="btn-outline text-lg px-8 py-4 font-semibold">
                Regístrate
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}