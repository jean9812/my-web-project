export default function Header({ total, filtered }) {
  return (
    <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur border-b border-border">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded border border-gold/50 flex items-center justify-center text-gold text-sm font-serif">
            藏
          </div>
          <div>
            <h1 className="font-serif text-parchment text-lg leading-tight tracking-wide">
              大英博物馆中国馆藏数字档案
            </h1>
            <p className="text-muted text-xs tracking-widest">
              BRITISH MUSEUM · CHINESE COLLECTION · DIGITAL ARCHIVE
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-right">
          <div className="hidden sm:block text-right">
            <div className="text-gold text-lg font-serif font-light">{filtered.toLocaleString()}</div>
            <div className="text-muted text-xs">共 {total.toLocaleString()} 件</div>
          </div>
          <a
            href="https://www.britishmuseum.org/collection"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 border border-border text-muted hover:border-gold/50 hover:text-gold transition-colors rounded-sm"
          >
            访问官网 ↗
          </a>
        </div>
      </div>
    </header>
  )
}
