import { Plugin } from '@nuxt/types'
import iziToast, { IziToastSettings } from 'izitoast'
import 'izitoast/dist/css/iziToast.css'

const toast = {
  ...iziToast,
  async $error(e: Error | Record<string, any>) {
    if ('response' in e) {
      const { message } = await e.response.json()
      iziToast.error({ title: 'Failed', message })
      return
    }
    iziToast.error({ title: 'Failed', message: e.message })
  },
  async $wrap(fn: () => Promise<void | string | IziToastSettings>) {
    try {
      const r = await fn()
      if (typeof r === 'string') {
        this.success({ title: 'Success', message: r })
      } else if (typeof r === 'object') {
        this.success(r)
      }
    } catch (e) {
      this.$error(e)
    }
  }
}

type Toast = typeof toast

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toast
  }
}

declare module '@nuxt/types' {
  interface Context {
    $toast: Toast
  }
}

const plugin: Plugin = (_ctx, inject) => {
  inject('toast', toast)
}

export default plugin
