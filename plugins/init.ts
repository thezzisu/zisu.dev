import { Plugin } from '@nuxt/types'

const plugin: Plugin = async (ctx) => {
  await ctx.store.dispatch('nuxtInit', ctx)
}

export default plugin
