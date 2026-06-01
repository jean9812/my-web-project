import { useState, useMemo, useCallback } from 'react'
import Header from './components/Header'
import DynastyTimeline from './components/DynastyTimeline'
import FilterPanel from './components/FilterPanel'
import Gallery from './components/Gallery'
import DetailModal from './components/DetailModal'
import { staticCollection, MATERIAL_MAP } from './data/collection'

export default function App() {
  const [dynasty, setDynasty] = useState('all')
  const [material, setMaterial] = useState('全部')
  const [objectType, setObjectType] = useState('全部')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    const matKey = MATERIAL_MAP[material]

    return staticCollection.filter((item) => {
      if (dynasty !== 'all' && item.dynasty !== dynasty) return false
      if (matKey && item.material !== matKey) return false
      if (objectType !== '全部' && item.objectType !== objectType) return false
      if (q) {
        const haystack = [
          item.title, item.titleZh, item.dynastyLabel,
          item.dateDisplay, item.origin, item.originZh,
          item.description, item.descriptionZh,
          ...(item.tags ?? []),
        ].join(' ').toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [dynasty, material, objectType, search])

  const handleDynastyChange = useCallback((id) => {
    setDynasty(id)
  }, [])

  return (
    <div className="min-h-screen bg-ink">
      <Header total={staticCollection.length} filtered={filtered.length} />
      <DynastyTimeline selected={dynasty} onChange={handleDynastyChange} />
      <FilterPanel
        material={material}
        objectType={objectType}
        search={search}
        onMaterial={setMaterial}
        onType={setObjectType}
        onSearch={setSearch}
      />

      <main>
        <Gallery
          items={filtered}
          onSelect={setSelected}
          loading={false}
        />
      </main>

      <footer className="border-t border-border/30 mt-8 py-6 text-center">
        <p className="text-muted/50 text-xs">
          数据来源：
          <a
            href="https://www.britishmuseum.org/collection"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors"
          >
            大英博物馆在线馆藏
          </a>
          {' '}· 仅供学术研究与文化教育用途
        </p>
      </footer>

      {selected && (
        <DetailModal item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
