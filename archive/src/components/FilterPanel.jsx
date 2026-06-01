import { MATERIALS, OBJECT_TYPES } from '../data/collection'

export default function FilterPanel({ material, objectType, search, onMaterial, onType, onSearch }) {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-4 flex flex-wrap gap-4 items-center border-b border-border/50">
      <div className="relative flex-1 min-w-48">
        <input
          type="text"
          placeholder="搜索藏品名称、材质、纪年…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-card border border-border text-parchment placeholder-muted text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-gold/60 transition-colors"
        />
        {search && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-parchment text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>

      <FilterSelect
        label="材质"
        value={material}
        options={MATERIALS}
        onChange={onMaterial}
      />
      <FilterSelect
        label="器型"
        value={objectType}
        options={OBJECT_TYPES}
        onChange={onType}
      />
    </div>
  )
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted text-xs whitespace-nowrap">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-card border border-border text-parchment text-sm px-2 py-1.5 rounded-sm focus:outline-none focus:border-gold/60 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}
