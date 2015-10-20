var localforage = require('localforage')
var Promise = require('promise')
var _ = require('lodash')

function setIfMissing(key, existing, defaultValue) {
  if (_.isNull(existing)) {
    return localforage.setItem(key, defaultValue)
  }
}

module.exports = {
  init: function (versionNumber) {
    localforage.config({
      name: 'nevergreen',
      storeName: 'nevergreen'
    })

    var keys = [
      'trays',
      'messages',
      'versionNumber'
    ]

    var defaultValues = [
      [],
      ['=(^.^)='],
      versionNumber
    ]

    return Promise.all(keys.map(function (key) {
      return localforage.getItem(key)
    })).then(function (existingValues) {
      var entriesWithDefaults = _.zip(keys, existingValues, defaultValues)
      return Promise.all(entriesWithDefaults.map(function (triple) {
        return setIfMissing.apply(this, triple)
      }))
    })
  },

  save: function (dataObject) {
    return Promise.all(_.pairs(dataObject).map(function (pair) {
      return localforage.setItem(pair[0], pair[1])
    }))
  },

  getConfiguration: function () {
    var configuration = {}
    return localforage.iterate(function (value, key) {
      configuration[key] = value
    }).then(function () {
      return configuration
    })
  },

  getItem: function (key) {
    return localforage.getItem(key)
  },

  setItem: function (key, value) {
    return localforage.setItem(key, value)
  },

  removeItem: function (key) {
    return localforage.removeItem(key)
  }
}