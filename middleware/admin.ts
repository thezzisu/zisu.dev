import { Middleware } from '@nuxt/types'

const middleware: Middleware = ({ store, redirect }) => {
  if (!store.state.user?.perm?.admin) {
    redirect('/')
  }
}

export default middleware
