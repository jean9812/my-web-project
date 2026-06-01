import { useEffect } from 'react'
import { MATERIAL_EMOJI, DYNASTIES } from '../data/collection'

const MATERIAL_LABEL_ZH = {
  bronze: '青铜', jade: '玉', ceramic: '陶瓷', silk: '丝织',
  gold: '黄金', lacquer: '漆器', stone: '石', paper: '纸/绢',
}

export default function DetailModal({ item, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const mat = item.material ?? 'default'
  const dynInfo = DYNASTIES.find((d) => d.id === item.dynasty)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative bg-surface border border-border rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-up shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-muted hover:text-parchment hover:bg-card rounded-sm transition-colors text-xl"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 flex-shrink-0">
            <div className="aspect-square md:h-full min-h-48 relative overflow-hidden">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full object-placeholder placeholder-${mat === 'default' ? 'default' : mat}`}>
                  <div className="text-center">
                    <div style={{ fontSize: '4rem', lineHeight: 1 }}>
                      {MATERIAL_EMOJI[mat] ?? MATERIAL_EMOJI.default}
                    </div>
                    <p className="text-muted/50 text-xs mt-2">图像暂未收录</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 p-6">
            {dynInfo && dynInfo.id !== 'all' && (
              <div
                className="inline-block text-xs px-2 py-0.5 rounded-sm text-ink font-medium mb-3"
                style={{ backgroundColor: dynInfo.color ?? '#c8a84b' }}
              >
                {item.dynastyLabel}
              </div>
            )}

            <h2 className="font-serif text-parchment text-2xl leading-tight mb-1">
              {item.titleZh ?? item.title}
            </h2>
            <p className="text-muted text-sm mb-4">{item.title}</p>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
              <MetaRow label="纪年" value={item.dateDisplay} />
              <MetaRow label="材质" value={MATERIAL_LABEL_ZH[mat] ?? mat} />
              <MetaRow label="器型" value={item.objectType} />
              <MetaRow label="来源地" value={item.originZh ?? item.origin} />
              {item.height && <MetaRow label="高度" value={`${item.height} cm`} />}
              <MetaRow label="馆藏编号" value={item.id} mono />
            </dl>

            {(item.descriptionZh || item.description) && (
              <div className="border-t border-border/50 pt-4">
                {item.descriptionZh && (
                  <p className="text-parchment/90 text-sm leading-relaxed mb-3 font-serif">
                    {item.descriptionZh}
                  </p>
                )}
                {item.description && (
                  <p className="text-muted text-xs leading-relaxed italic">
                    {item.description}
                  </p>
                )}
              </div>
            )}

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-card border border-border/60 text-muted rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-border/50">
              <a
                href={item.bmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm px-4 py-2 border border-gold/50 text-gold hover:bg-gold hover:text-ink transition-all rounded-sm"
              >
                在大英博物馆官网查看 ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetaRow({ label, value, mono }) {
  if (!value) return null
  return (
    <>
      <dt className="text-muted text-xs">{label}</dt>
      <dd className={`text-parchment/90 text-xs truncate ${mono ? 'font-mono' : ''}`}>{value}</dd>
    </>
  )
}
