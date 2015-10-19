var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter
var eventEmitter = new EventEmitter()
var Constants = require('../constants/NevergreenConstants')

var CHANGE_EVENT = 'interesting-projects-change'

var _projects = []

function getName(apiProject) {
  return apiProject.stage ? apiProject.name + ' [' + apiProject.stage + ']' : apiProject.name
}

function toProject(apiProject) {
  return {
    projectId: apiProject['project-id'],
    name: getName(apiProject),
    prognosis: apiProject.prognosis
  }
}

var dispatchToken = AppDispatcher.register(function (action) {
  switch (action.type) {
    case Constants.InterestingProjects:
    {
      _projects = action.projects.map(toProject)
      break
    }
    case Constants.ImportedData:
    {
      _projects = []
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
    return _projects
  },

  addListener: function (callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener: function (callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
