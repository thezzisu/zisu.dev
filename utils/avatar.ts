import gravatar from 'gravatar'

export function getAvatar(email: string) {
  return gravatar.url(email, { protocol: 'https' })
}
