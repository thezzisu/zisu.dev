const STATICALLY_BASE = 'https://res.zisu.dev'

function parse(url: string) {
  const o = new URL(url)
  return { host: o.hostname, path: o.pathname }
}

function cvt(params: Record<string, any> | undefined) {
  if (!params) return ''
  const keys = Object.keys(params)
  if (!keys.length) return ''
  return '/' + keys.map((x) => `${x}=${params[x]}`).join(',')
}

interface IImgParams {
  h?: number
  w?: number
  f?: 'auto'
  q?: number
}

export function img(url: string, params?: IImgParams) {
  const { host, path } = parse(url)
  return `${STATICALLY_BASE}/img/${host}${cvt(params)}${path}`
}

interface IScreenshotParams {
  device?: 'mobile'
  full?: true
}

export function screenshot(url: string, params?: IScreenshotParams) {
  const { host, path } = parse(url)
  return `${STATICALLY_BASE}/screenshot${cvt(params)}/${host}${path}`
}

export function defined(name: string) {
  return `${STATICALLY_BASE}/defined/${name}`
}
