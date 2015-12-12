var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter
var eventEmitter = new EventEmitter()
var Constants = require('../constants/NevergreenConstants')

var CHANGE_EVENT = 'interesting-projects-change'

var _storeState = {
  projects: [],
  error: null
}

function getName(apiProject) {
  return apiProject.stage ? apiProject.name + ' [' + apiProject.stage + ']' : apiProject.name
}

function toProject(apiProject) {
  return {
    projectId: apiProject.projectId,
    name: getName(apiProject),
    prognosis: apiProject.prognosis,
    lastBuildTime: apiProject.lastBuildTime
  }
}

var dispatchToken = AppDispatcher.register(function (action) {
  switch (action.type) {
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
    case Constants.ImportedData:
    {
      _storeState = {
        projects: [],
        error: null
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

  getAll: function () {
    return _storeState.projects
  },

  getLastError: function () {
    return _storeState.error
  },

  addListener: function (callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener: function (callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
