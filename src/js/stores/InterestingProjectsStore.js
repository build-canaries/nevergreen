const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const eventEmitter = new EventEmitter()
const Constants = require('../constants/NevergreenConstants')

const CHANGE_EVENT = 'interesting-projects-change'

let _storeState = null

function getName(apiProject) {
  return apiProject.stage ? `${apiProject.name} [${apiProject.stage}]` : apiProject.name
}

function toProject(apiProject) {
  return {
    projectId: apiProject.projectId,
    name: getName(apiProject),
    prognosis: apiProject.prognosis,
    lastBuildTime: apiProject.lastBuildTime
  }
}

const dispatchToken = AppDispatcher.register(action => {
  switch (action.type) {
    case Constants.AppInit:
    {
      _storeState = {
        projects: [],
        error: null
      }
      break
    }
    case Constants.InterestingProjects:
    {
      _storeState.projects = action.projects.map(toProject)
      _storeState.error = null
      break
    }
    case Constants.InterestingProjectsError:
    {
      _storeState.error = action.error
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

  getAll() {
    return _storeState.projects
  },

  getLastError() {
    return _storeState.error
  },

  addListener(callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
