import { Context } from '@nuxt/types'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import pathify, { make } from 'vuex-pathify'

export const state = () => ({
  user: null as Record<string, any> | null,
  zen: false,
  bar: {
    IndexShowLogo: false
  },
  drawers: {
    nav: false,
    settings: false
  },
  persist: {
    theme: 0, // [auto, dark, light]
    sysTheme: 2, // Default is light
    acrylic: 1,
    token: ''
  },
  local: {
    editor: {
      basic: false
    }
  }
})

type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  ...make.getters(state),
  isAdmin: (state) => state.user?.perm.admin,
  userBadge: (state) => (state.user?.perm.admin ? 'Admin' : 'User'),
  theme: (state) => state.persist.theme || state.persist.sysTheme
}

export const mutations: MutationTree<RootState> = {
  ...make.mutations(state)
}

export const actions: ActionTree<RootState, RootState> = {
  ...make.actions(state),
  async nuxtInit(_store, ctx: Context) {
    if (process.server) {
      const cur = ctx.app.$cookies.get('state')
      if (cur) {
        try {
          const parsed = JSON.parse(cur)
          const { persist, ...old } = this.state
          this.replaceState({
            ...old,
            persist: {
              ...persist,
              ...parsed
            }
          })
        } catch (e) {
          ctx.app.$cookies.remove('state')
        }
      }
    }

    const token = this.state.persist.token
    if (token) {
      ctx.$axios.setToken(token, 'Bearer')
      if (!this.state.user) {
        try {
          const res: any = await ctx.$axios.$get('/session')
          this.set('user', res.user)
        } catch (e) {
          this.set('persist@token', '')
          ctx.$axios.setToken(false)
        }
      }
    }
  }
}

export const plugins = [pathify.plugin]
