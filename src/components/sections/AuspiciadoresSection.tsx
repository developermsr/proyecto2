export default function AuspiciadoresSection() {
  return (
    <section className="py-16 px-4 bg-brand">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-secondary text-center mb-12">Auspiciadores</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-cards rounded-xl p-8 flex items-center justify-center min-h-[120px] border-2 border-dashed border-muted hover:border-brand transition-colors"
            >
              <span className="text-muted text-sm font-medium">Logo Auspiciador {i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}