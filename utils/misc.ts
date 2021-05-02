export function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function fix(num: number) {
  return Math.floor(num * 100) / 100
}

const sfx = ['B', 'K', 'M', 'G', 'T', 'E', 'P']

export function formatDataSize(bytes: number) {
  let i = 0
  for (; bytes > 100; i++) bytes /= 1024
  return `${fix(bytes)}${sfx[i]}`
}
