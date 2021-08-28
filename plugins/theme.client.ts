import { Plugin } from '@nuxt/types'

const plugin: Plugin = (ctx) => {
  try {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    ctx.store.set('systemTheme', query.matches ? 1 : 2)
    query.addEventListener('change', (ev) => {
      ctx.store.set('systemTheme', ev.matches ? 1 : 2)
    })
  } catch (e) {
    //
  }
}

export default plugin
