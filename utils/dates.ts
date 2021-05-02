export function toISODateString(date: Date) {
  const y = date.getFullYear().toString().padStart(4, '0')
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function updateByISODateString(date: Date, str: string) {
  const [y, m, d] = str.split('-').map((x) => parseInt(x))
  date.setFullYear(y)
  date.setMonth(m - 1)
  date.setDate(d)
  return date
}

export function toISOTimeString(date: Date) {
  const h = date.getHours().toString().padStart(2, '0')
  const m = date.getMinutes().toString().padStart(2, '0')
  const s = date.getSeconds().toString().padStart(2, '0')
  return `${h}:${m}:${s}`
}

export function updateByISOTimeString(date: Date, str: string) {
  const [h, m, s] = str.split(':').map((x) => parseInt(x))
  date.setHours(h)
  date.setMinutes(m)
  date.setSeconds(s)
  return date
}
