var store = (function () {
  var store = {}
  return {
    getItem: function (key) {
      return store[key] || null
    },
    setItem: function (key, value) {
      store[key] = value.toString()
      this.length = store.length
    },
    removeItem: function (key) {
      delete store[key]
      this.length = store.length
    },
    clear: function () {
      store = {}
      this.length = 0
    },
    length: 0
  }
})()

Object.defineProperty(window, 'localStorage', {value: store})
