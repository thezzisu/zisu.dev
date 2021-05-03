import { Context } from '@nuxt/types'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { getItem } from '~/utils/localStorage'

type Theme = 'auto' | 'dark' | 'light'

export const state = () => ({
  scope: 'index',
  theme: 'auto' as Theme,
  acrylic: true,
  token: null as string | null,
  user: null as Record<string, any> | null,
  initialized: false,
  zen: false,
  settingsDrawer: false,
  editor: {
    basic: false
  }
})

type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  isAdmin: (state) => state.user?.perm.admin,
  userBadge: (state) => (state.user?.perm.admin ? 'Admin' : 'User')
}

export const mutations: MutationTree<RootState> = {
  'scope:update'(state: RootState, scope: string) {
    state.scope = scope
  },
  'theme:update'(state: RootState, theme: Theme) {
    state.theme = theme
  },
  'acrylic:update'(state: RootState, acrylic: boolean) {
    state.acrylic = acrylic
  },
  'token:update'(state: RootState, token: string) {
    state.token = token
  },
  'user:update'(state: RootState, user: any) {
    state.user = user
  },
  'zen:update'(state: RootState, zen: boolean) {
    state.zen = zen
  },
  'settingsDrawer:update'(state: RootState, settingsDrawer: boolean) {
    state.settingsDrawer = settingsDrawer
  },
  ':initialize'(state: RootState) {
    state.initialized = true
  },
  ':login'(state: RootState, { token, user }) {
    state.token = token
    state.user = user
  },
  ':logout'(state: RootState) {
    state.token = state.user = null
  },
  'editor:basic:update'(state: RootState, basic: boolean) {
    state.editor.basic = basic
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtInit(store, ctx: Context) {
    const { app } = ctx
    const { $cookies } = app
    const token = $cookies.get('token')
    const acrylic = $cookies.get('acrylic')
    const theme = $cookies.get('theme')

    if (!store.state.initialized) {
      if (['auto', 'light', 'dark'].includes(theme)) {
        store.commit('theme:update', theme)
      } else if (theme !== undefined) {
        $cookies.remove('theme')
      }

      if (typeof acrylic === 'boolean') {
        store.commit('acrylic:update', acrylic)
      } else if (acrylic !== undefined) {
        $cookies.remove('acrylic')
      }

      if (token) {
        try {
          ctx.$axios.setToken(token, 'Bearer')
          const res: any = await ctx.$axios.$get('/session')
          store.commit('token:update', token)
          store.commit('user:update', res.user)
        } catch (e) {
          ctx.$axios.setToken(false)
          $cookies.remove('token')
        }
      }
      store.commit(':initialize')
    } else if (store.state.token) {
      ctx.$axios.setToken(token, 'Bearer')
    }

    if (process.client) {
      store.commit(
        'editor:basic:update',
        getItem<boolean>('settings:editor:basic') ?? false
      )
    }
  }
}
