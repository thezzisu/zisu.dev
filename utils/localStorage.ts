export function getItem<T>(path: string) {
  try {
    const value = localStorage.getItem(path)
    if (value === null) return
    return JSON.parse(value) as T
  } catch (e) {
    localStorage.removeItem(path)
  }
}

export function setItem<T>(path: string, value: T) {
  localStorage.setItem(path, JSON.stringify(value))
}

export function removeItem(path: string) {
  localStorage.removeItem(path)
}

export function sync<T>(path: string) {
  return {
    get() {
      return getItem<T>(path)
    },
    set(value: T) {
      return setItem(path, value)
    }
  }
}
