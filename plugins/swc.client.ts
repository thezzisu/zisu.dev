import { Plugin } from '@nuxt/types'

const plugin: Plugin = (ctx) => {
  if (window.$workbox) {
    window.$workbox.then((wb) => {
      wb.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          ctx.$toast.info({ title: 'Site updated', message: 'Please refresh' })
        }
      })
    })
  }
}

export default plugin
