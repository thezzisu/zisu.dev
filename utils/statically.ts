const STATICALLY_BASE = 'https://res.zisu.dev'

function cvt(params: Record<string, any> | undefined) {
  if (!params) return ''
  const keys = Object.keys(params)
  if (!keys.length) return ''
  return '/' + keys.map((x) => `${x}=${params[x]}`).join(',')
}

export function img(url: string) {
  const { protocol, host, pathname } = new URL(url)
  return `${STATICALLY_BASE}/img/${protocol}/${host}${pathname}`
}

interface IScreenshotParams {
  device?: 'mobile'
  full?: true
}

export function screenshot(url: string, params?: IScreenshotParams) {
  const { host, pathname } = new URL(url)
  return `${STATICALLY_BASE}/s/screenshot${cvt(params)}/${host}${pathname}`
}

export function defined(name: string) {
  return `${STATICALLY_BASE}/defined/${name}`
}
