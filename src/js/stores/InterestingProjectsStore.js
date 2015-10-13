var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter
var eventEmitter = new EventEmitter()
var Constants = require('../constants/NevergreenConstants')

var CHANGE_EVENT = 'interesting-projects-change'

var _projects = []

function getName(project) {
  return project.stage ? project.name + ' [' + project.stage + ']' : project.name
}

function toProject(project) {
  return {
    id: project['project-id'],
    name: getName(project),
    prognosis: project.prognosis
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
