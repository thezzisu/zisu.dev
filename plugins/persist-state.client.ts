import { Plugin } from '@nuxt/types'

function tryParseStorage(key: string) {
  const value = localStorage.getItem(key)
  if (!value) return {}
  try {
    const parsed = JSON.parse(value)
    return parsed
  } catch (e) {
    localStorage.removeItem(key)
    return {}
  }
}

const plugin: Plugin = ({ store }) => {
  localStorage.setItem('state', JSON.stringify(store.state.persist))

  window.addEventListener('storage', (ev) => {
    if (ev.key === 'state') {
      const parsed = tryParseStorage('state')
      const { persist, ...old } = store.state
      store.replaceState({
        ...old,
        persist: {
          ...persist,
          ...parsed
        }
      })
    } else if (ev.key === 'local') {
      const parsed = tryParseStorage('local')
      const { local, ...old } = store.state
      store.replaceState({
        ...old,
        local: {
          ...local,
          ...parsed
        }
      })
    }
  })

  store.watch(
    (state) => state.persist,
    (value) => {
      store.$cookies.set('state', JSON.stringify(value), { path: '/' })
      localStorage.setItem('state', JSON.stringify(value))
    },
    { deep: true }
  )

  store.watch(
    (state) => state.local,
    (value) => localStorage.setItem('local', JSON.stringify(value)),
    { deep: true }
  )

  const parsed = tryParseStorage('local')
  const { local, ...old } = store.state
  store.replaceState({
    ...old,
    local: {
      ...local,
      ...parsed
    }
  })
}

export default plugin
