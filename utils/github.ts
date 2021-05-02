import * as uuid from 'uuid'

export const enabled = !!process.env.GITHUB_CLIENT_ID

export const GITHUB_OAUTH_STATE = 'GITHUB_OAUTH_STATE'

export function open() {
  const state = uuid.v4()
  localStorage.setItem(GITHUB_OAUTH_STATE, state)
  const redirect = location.href.split('?')[0]
  location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${redirect}&state=${state}`
}

export function getState() {
  const state = localStorage.getItem(GITHUB_OAUTH_STATE)
  if (state) {
    localStorage.removeItem(GITHUB_OAUTH_STATE)
    return state
  }
}
