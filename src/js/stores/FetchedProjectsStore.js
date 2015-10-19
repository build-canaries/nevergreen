var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter
var eventEmitter = new EventEmitter()
var _ = require('lodash')
var Constants = require('../constants/NevergreenConstants')

var CHANGE_EVENT = 'projects-change'

var _storeState = {}

function previouslyRemovedProjects(project) {
  return !project.wasRemoved
}

function updateNewAndRemovedFlags(fetchedProjects, project) {
  var whereIdsMatch = function (fetchedProject) {
    return fetchedProject['project-id'] === project.projectId
  }
  return {
    projectId: project.projectId,
    name: project.name,
    isNew: false,
    wasRemoved: _.findIndex(fetchedProjects, whereIdsMatch) < 0
  }
}

function getName(project) {
  return project.stage ? project.name + ' [' + project.stage + ']' : project.name
}

function toProject(project) {
  return {
    projectId: project['project-id'],
    name: getName(project),
    isNew: true,
    wasRemoved: false
  }
}

function removeJobs(project) {
  return _.isNull(project.job)
}

function removeExisting(previousProjects, project) {
  var whereIdsMatch = function (previousProject) {
    return previousProject.projectId === project.projectId
  }
  return _.findIndex(previousProjects, whereIdsMatch) < 0
}

function createProjects(previousProjects, fetchedProjects) {
  return previousProjects
    .filter(previouslyRemovedProjects)
    .map(updateNewAndRemovedFlags.bind(this, fetchedProjects))
    .concat(fetchedProjects
      .filter(removeJobs)
      .map(toProject)
      .filter(removeExisting.bind(this, previousProjects)))
}

var dispatchToken = AppDispatcher.register(function (action) {
  switch (action.type) {
    case Constants.TrayAdd:
    {
      _storeState[action.trayId] = []
      break
    }
    case Constants.TrayRemove:
    {
      delete _storeState[action.trayId]
      break
    }
    case Constants.ProjectsFetched:
    {
      _storeState[action.trayId] = createProjects(_storeState[action.trayId], action.projects)
      break
    }
    case Constants.ImportedData:
    {
      _storeState = {}
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

  getAll: function (trayId) {
    return _storeState[trayId] || []
  },

  addListener: function (callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener: function (callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
