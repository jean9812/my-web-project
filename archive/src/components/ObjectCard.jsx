import { MATERIAL_EMOJI, DYNASTIES } from '../data/collection'

const MATERIAL_CLASS = {
  bronze:  'placeholder-bronze  material-bronze',
  jade:    'placeholder-jade    material-jade',
  ceramic: 'placeholder-ceramic material-ceramic',
  silk:    'placeholder-silk    material-silk',
  gold:    'placeholder-gold    material-gold',
  lacquer: 'placeholder-lacquer material-lacquer',
  stone:   'placeholder-stone   material-stone',
  paper:   'placeholder-paper   material-paper',
  default: 'placeholder-default material-default',
}

const MATERIAL_LABEL_ZH = {
  bronze:  '青铜',
  jade:    '玉',
  ceramic: '陶瓷',
  silk:    '丝织',
  gold:    '黄金',
  lacquer: '漆器',
  stone:   '石',
  paper:   '纸/绢',
  default: '',
}

export default function ObjectCard({ item, onClick }) {
  const mat = item.material ?? 'default'
  const classes = MATERIAL_CLASS[mat] ?? MATERIAL_CLASS.default
  const [placeholderClass, badgeClass] = classes.split('  ')
  const dynInfo = DYNASTIES.find((d) => d.id === item.dynasty)

  return (
    <button
      onClick={() => onClick(item)}
      className="group text-left bg-card border border-border rounded-sm overflow-hidden hover:border-gold/40 hover:shadow-xl hover:shadow-black/40 transition-all duration-200 animate-slide-up"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className={`object-placeholder ${placeholderClass} group-hover:opacity-80 transition-opacity`}>
            <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>
              {MATERIAL_EMOJI[mat] ?? MATERIAL_EMOJI.default}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {dynInfo && dynInfo.id !== 'all' && (
          <div
            className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-sm font-sans text-ink font-medium"
            style={{ backgroundColor: dynInfo.color ?? '#c8a84b' }}
          >
            {item.dynastyLabel}
          </div>
        )}
      </div>

      <div className="p-3">
        <p className="font-serif text-parchment text-sm leading-snug line-clamp-2 mb-1">
          {item.titleZh ?? item.title}
        </p>
        <p className="text-muted text-xs line-clamp-1 mb-2">{item.title}</p>

        <div className="flex items-center justify-between gap-2">
          <span className={`material-badge ${badgeClass} text-xs`}>
            {MATERIAL_LABEL_ZH[mat] ?? mat}
          </span>
          <span className="text-muted/70 text-xs truncate">{item.dateDisplay}</span>
        </div>
      </div>
    </button>
  )
}
