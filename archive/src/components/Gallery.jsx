import ObjectCard from './ObjectCard'

export default function Gallery({ items, onSelect, loading }) {
  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 15 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 py-20 text-center">
        <div className="text-6xl mb-4 opacity-30">🏛️</div>
        <p className="text-muted text-lg font-serif">未找到符合条件的藏品</p>
        <p className="text-muted/60 text-sm mt-2">请尝试调整筛选条件</p>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <ObjectCard key={item.id} item={item} onClick={onSelect} />
        ))}
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-sm overflow-hidden">
      <div
        className="aspect-[4/3] animate-shimmer"
        style={{
          backgroundImage: 'linear-gradient(90deg, #141d2a 25%, #1e2d3e 50%, #141d2a 75%)',
          backgroundSize: '200% 100%',
        }}
      />
      <div className="p-3 space-y-2">
        <div className="h-3 rounded bg-border animate-pulse w-3/4" />
        <div className="h-2 rounded bg-border/60 animate-pulse w-1/2" />
      </div>
    </div>
  )
}
