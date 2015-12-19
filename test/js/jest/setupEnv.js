const store = (() => {
  let store = {}
  return {
    getItem(key) {
      return store[key] || null
    },
    setItem(key, value) {
      store[key] = value.toString()
      this.length = store.length
    },
    removeItem(key) {
      delete store[key]
      this.length = store.length
    },
    clear() {
      store = {}
      this.length = 0
    },
    length: 0
  }
})()

Object.defineProperty(window, 'localStorage', {value: store})
