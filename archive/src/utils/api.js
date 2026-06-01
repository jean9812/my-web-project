const BM_API_BASE = 'https://www.britishmuseum.org/api'

export async function searchBMCollection(keyword = 'chinese', page = 1) {
  try {
    const params = new URLSearchParams({
      keyword,
      'place[]': 'Asia/Chinese',
      page: String(page),
      per_page: '20',
    })
    const res = await fetch(`${BM_API_BASE}/search?${params}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return { items: data.objects ?? [], total: data.total ?? 0 }
  } catch {
    return null
  }
}

export function normalizeBMObject(raw) {
  return {
    id: raw.id ?? raw.objectId,
    title: raw.title ?? raw.name ?? 'Untitled',
    titleZh: null,
    dynasty: guessDynasty(raw.production_date ?? ''),
    dynastyLabel: raw.production_date ?? '',
    dateDisplay: raw.production_date ?? '',
    dateStart: null,
    material: guessMaterial(raw.material ?? ''),
    objectType: raw.object_type ?? '',
    origin: raw.production_place ?? 'China',
    description: raw.description ?? '',
    height: null,
    bmUrl: `https://www.britishmuseum.org/collection/object/${raw.id}`,
    imageUrl: raw.image?.large ?? null,
    fromApi: true,
  }
}

function guessMaterial(str) {
  const s = str.toLowerCase()
  if (s.includes('bronze') || s.includes('copper')) return 'bronze'
  if (s.includes('jade') || s.includes('nephrite')) return 'jade'
  if (s.includes('porcelain') || s.includes('ceramic') || s.includes('pottery')) return 'ceramic'
  if (s.includes('silk') || s.includes('textile')) return 'silk'
  if (s.includes('gold') || s.includes('silver')) return 'gold'
  if (s.includes('lacquer')) return 'lacquer'
  if (s.includes('stone') || s.includes('marble')) return 'stone'
  if (s.includes('paper') || s.includes('ink')) return 'paper'
  return 'default'
}

function guessDynasty(str) {
  const s = str.toLowerCase()
  if (s.includes('tang'))    return 'tang'
  if (s.includes('song'))    return 'song'
  if (s.includes('yuan'))    return 'yuan'
  if (s.includes('ming'))    return 'ming'
  if (s.includes('qing'))    return 'qing'
  if (s.includes('han'))     return 'qin_han'
  if (s.includes('zhou'))    return 'zhou'
  if (s.includes('shang'))   return 'shang'
  if (s.includes('neolithic') || s.includes('yangshao')) return 'neolithic'
  return 'all'
}
