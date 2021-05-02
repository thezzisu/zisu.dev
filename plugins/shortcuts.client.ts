import { Plugin } from '@nuxt/types'
import Mousetrap from 'mousetrap'

const plugin: Plugin = (ctx) => {
  Mousetrap.bind('ctrl+alt+z', () => {
    ctx.$toast.info({
      title: 'Zen',
      message: ctx.store.state.zen ? 'Disabled' : 'Enabled'
    })
    ctx.store.commit('zen:update', !ctx.store.state.zen)
  })
}

export default plugin
