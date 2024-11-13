export const formCache = {
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('Error saving to cache:', e)
    }
  },
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (e) {
      console.error('Error reading from cache:', e)
      return null
    }
  },
  clear: (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error('Error clearing cache:', e)
    }
  }
}
