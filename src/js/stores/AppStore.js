const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const eventEmitter = new EventEmitter()
const Constants = require('../constants/NevergreenConstants')
const ConfigurationStore = require('./ConfigurationStore')
const DisplayStore = require('./DisplayStore')
const FetchedProjectsStore = require('./FetchedProjectsStore')
const InterestingProjectsStore = require('./InterestingProjectsStore')
const SelectedProjectsStore = require('./SelectedProjectsStore')
const SuccessStore = require('./SuccessStore')
const TrayStore = require('./TrayStore')
const UiMessageStore = require('./UiMessageStore')
const PushedMessagesStore = require('./PushedMessagesStore')
const Package = require('../../../package')

const CHANGE_EVENT = 'app-change'

const allStoreTokens = [
  ConfigurationStore.dispatchToken,
  DisplayStore.dispatchToken,
  FetchedProjectsStore.dispatchToken,
  InterestingProjectsStore.dispatchToken,
  SelectedProjectsStore.dispatchToken,
  SuccessStore.dispatchToken,
  TrayStore.dispatchToken,
  UiMessageStore.dispatchToken,
  PushedMessagesStore.dispatchToken
]

let _storeState = {
  initalised: false
}

const dispatchToken = AppDispatcher.register(action => {
  switch (action.type) {
    case Constants.AppInit:
    {
      AppDispatcher.waitFor(allStoreTokens)
      _storeState = {
        initalised: true,
        versionNumber: Package.version,
        versionName: Package.versionName,
        versionColour: Package.versionColour,
        commitHash: Package.commitHash
      }
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
    return _storeState.initalised
  },

  versionNumber() {
    return _storeState.versionNumber
  },

  versionName() {
    return _storeState.versionName
  },

  versionColour() {
    return _storeState.versionColour
  },

  commitHash() {
    return _storeState.commitHash
  },

  addListener(callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
