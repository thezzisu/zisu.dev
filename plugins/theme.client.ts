import { Plugin } from '@nuxt/types'

const plugin: Plugin = (ctx) => {
  try {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    ctx.store.set('persist@sysTheme', query.matches ? 1 : 2)
    query.addEventListener('change', (ev) => {
      ctx.store.set('persist@sysTheme', ev.matches ? 1 : 2)
    })
  } catch (e) {
    // Do not support
  }
}

export default plugin
