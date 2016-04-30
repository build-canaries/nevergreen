import AppDispatcher from '../dispatcher/AppDispatcher'
import {EventEmitter} from 'events'
import {AppInit} from '../constants/NevergreenConstants'
import ConfigurationStore from './ConfigurationStore'
import DisplayStore from './DisplayStore'
import FetchedProjectsStore from './FetchedProjectsStore'
import InterestingProjectsStore from './InterestingProjectsStore'
import SelectedProjectsStore from './SelectedProjectsStore'
import SuccessStore from './SuccessStore'
import TrayStore from './TrayStore'
import UiMessageStore from './UiMessageStore'
import NotificationStore from './NotificationStore'
import Package from '../../../package'

const eventEmitter = new EventEmitter()
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
  NotificationStore.dispatchToken
]

let _storeState = {
  initalised: false
}

const dispatchToken = AppDispatcher.register((action) => {
  switch (action.type) {
    case AppInit:
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
  dispatchToken,

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

  hostname() {
    return window.location.hostname
  },

  addListener(callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
