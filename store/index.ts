import { GetterTree, ActionTree, MutationTree } from 'vuex'
import pathify, { make } from 'vuex-pathify'

export const state = () => ({
  user: null as Record<string, any> | null,
  zen: false,
  fab: false,
  bar: {
    IndexShowLogo: false
  },
  drawers: {
    nav: false,
    settings: false
  },
  footer: {
    offset: 0
  },
  systemTheme: 2, // Default is light
  local: {
    theme: 0, // [auto, dark, light]
    acrylic: 1,
    token: '',
    editor: {
      basic: false
    }
  }
})

type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  ...make.getters(state),
  theme(state) {
    return state.local.theme || state.systemTheme
  }
}

export const mutations: MutationTree<RootState> = {
  ...make.mutations(state)
}

export const actions: ActionTree<RootState, RootState> = {
  ...make.actions(state)
}

export const plugins = [pathify.plugin]
