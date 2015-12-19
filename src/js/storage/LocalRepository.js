const localforage = require('localforage')
const Promise = require('promise')
const _ = require('lodash')

function setIfMissing(key, existing, defaultValue) {
  if (_.isNull(existing)) {
    return localforage.setItem(key, defaultValue)
  }
}

module.exports = {
  init(versionNumber) {
    localforage.config({
      name: 'nevergreen',
      storeName: 'nevergreen'
    })

    const keys = [
      'trays',
      'messages',
      'displaySettings',
      'created'
    ]

    const defaultValues = [
      [],
      ['=(^.^)='],
      {
        showBrokenBuildTimers: false
      },
      {
        versionNumber: versionNumber,
        timestamp: new Date().toUTCString()
      }
    ]

    return Promise.all(keys.map(key => {
      return localforage.getItem(key)
    })).then(existingValues => {
      const entriesWithDefaults = _.zip(keys, existingValues, defaultValues)
      return Promise.all(entriesWithDefaults.map(triple => {
        return setIfMissing.apply(this, triple)
      }))
    })
  },

  save(dataObject) {
    return Promise.all(_.pairs(dataObject).map(pair => {
      return localforage.setItem(pair[0], pair[1])
    }))
  },

  getConfiguration() {
    const configuration = {}
    return localforage.iterate((value, key) => {
      configuration[key] = value
    }).then(() => {
      return configuration
    })
  },

  getItem(key) {
    return localforage.getItem(key)
  },

  setItem(key, value) {
    return localforage.setItem(key, value)
  },

  removeItem(key) {
    return localforage.removeItem(key)
  }
}
