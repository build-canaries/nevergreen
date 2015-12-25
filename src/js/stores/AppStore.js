const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const eventEmitter = new EventEmitter()
const Constants = require('../constants/NevergreenConstants')
const FetchedProjectsStore = require('./FetchedProjectsStore')
const InterestingProjectsStore = require('./InterestingProjectsStore')
const SelectedProjectsStore = require('./SelectedProjectsStore')
const SuccessStore = require('./SuccessStore')
const TrayStore = require('./TrayStore')
const CHANGE_EVENT = 'app-change'

const allStoreTokens = [
  FetchedProjectsStore.dispatchToken,
  InterestingProjectsStore.dispatchToken,
  SelectedProjectsStore.dispatchToken,
  SuccessStore.dispatchToken,
  TrayStore.dispatchToken
]
let _initalised = false

const dispatchToken = AppDispatcher.register(action => {
  switch (action.type) {
    case Constants.AppInit:
    {
      AppDispatcher.waitFor(allStoreTokens)
      _initalised = true
      break
    }
    default :
    {
      return true
    }
  }

  eventEmitter.emit(CHANGE_EVENT)
  return true
})

module.exports = {
  dispatchToken: dispatchToken,

  isInitalised() {
    return _initalised
  },

  addListener(callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
