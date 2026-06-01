import { DYNASTIES } from '../data/collection'

export default function DynastyTimeline({ selected, onChange }) {
  return (
    <div className="border-b border-border bg-surface/50">
      <div className="max-w-screen-xl mx-auto px-6 py-3">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 hide-scrollbar">
          {DYNASTIES.map((d) => (
            <button
              key={d.id}
              onClick={() => onChange(d.id)}
              className={`
                relative flex-shrink-0 px-4 py-2 rounded-sm text-sm font-serif transition-all duration-200
                ${selected === d.id
                  ? 'bg-gold text-ink font-medium shadow-lg'
                  : 'text-muted hover:text-parchment hover:bg-card'
                }
              `}
            >
              <span className="text-base">{d.label}</span>
              {d.id !== 'all' && (
                <span className={`block text-center leading-none mt-0.5 font-sans text-xs ${
                  selected === d.id ? 'text-ink/70' : 'text-muted/60'
                }`}>
                  {d.labelEn}
                </span>
              )}
              {selected === d.id && d.color && (
                <span
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                  style={{ backgroundColor: d.color }}
                />
              )}
            </button>
          ))}
        </div>

        <DynastyBar selected={selected} onChange={onChange} />
      </div>
    </div>
  )
}

function DynastyBar({ selected, onChange }) {
  const MIN = -3200
  const MAX = 1912
  const SPAN = MAX - MIN

  const dynasties = DYNASTIES.filter((d) => d.id !== 'all')
  const pos = (year) => `${((year - MIN) / SPAN) * 100}%`

  return (
    <div className="relative mt-3 mb-1 h-6 hidden md:block">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-border" />
      </div>

      {[- 3000, -2000, -1000, 0, 500, 1000, 1500, 1912].map((yr) => (
        <div
          key={yr}
          className="absolute top-0 flex flex-col items-center"
          style={{ left: pos(yr), transform: 'translateX(-50%)' }}
        >
          <div className="w-px h-2 bg-border/60" />
          <span className="text-muted/50 text-xs mt-0.5 whitespace-nowrap">
            {yr < 0 ? `${Math.abs(yr)} BCE` : yr === 0 ? 'CE 1' : `${yr}`}
          </span>
        </div>
      ))}

      {dynasties.map((d) => (
        <button
          key={d.id}
          onClick={() => onChange(d.id)}
          className="absolute top-0 h-full flex items-center"
          style={{
            left: pos(d.start),
            width: `${((d.end - d.start) / SPAN) * 100}%`,
          }}
          title={`${d.label} (${d.labelEn})`}
        >
          <div
            className={`w-full h-3 rounded-sm opacity-60 hover:opacity-90 transition-opacity cursor-pointer ${
              selected === d.id ? 'opacity-100 ring-1 ring-white/30' : ''
            }`}
            style={{ backgroundColor: d.color ?? '#4a6a8a' }}
          />
        </button>
      ))}
    </div>
  )
}
