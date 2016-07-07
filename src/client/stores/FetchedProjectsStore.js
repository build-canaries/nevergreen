import AppDispatcher from '../common/AppDispatcher'
import {EventEmitter} from 'events'
import {TrayAdd, TrayRemove, ProjectsFetched} from '../tracking/TrackingActions'
import {AppInit} from '../NevergreenActions'
import {IMPORTED_DATA} from '../backup/BackupActions'
import _ from 'lodash'
import LocalRepository from '../common/LocalRepository'

const eventEmitter = new EventEmitter()
const storageKey = 'fetchedProjects'
const CHANGE_EVENT = 'projects-change'

let _storeState = null

function previouslyRemovedProjects(project) {
  return !project.wasRemoved
}

function updateNewAndRemovedFlags(fetchedProjects, project) {
  const whereIdsMatch = (fetchedProject) => {
    return fetchedProject.projectId === project.projectId
  }
  return {
    projectId: project.projectId,
    name: project.name,
    isNew: false,
    wasRemoved: _.findIndex(fetchedProjects, whereIdsMatch) < 0
  }
}

function getName(project) {
  return project.stage ? `${project.name} ${project.stage}` : project.name
}

function toProject(project) {
  return {
    projectId: project.projectId,
    name: getName(project),
    isNew: true,
    wasRemoved: false
  }
}

function removeJobs(project) {
  return _.isNull(project.job)
}

function removeExisting(previousProjects, project) {
  const whereIdsMatch = (previousProject) => {
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

const dispatchToken = AppDispatcher.register((action) => {
  switch (action.type) {
    case AppInit:
    {
      _storeState = Object.assign({}, action.configuration[storageKey])
      break
    }
    case IMPORTED_DATA:
    {
      _storeState = action.configuration[storageKey]
      break
    }
    case TrayAdd:
    {
      _storeState[action.trayId] = []
      break
    }
    case TrayRemove:
    {
      delete _storeState[action.trayId]
      break
    }
    case ProjectsFetched:
    {
      _storeState[action.trayId] = createProjects(_storeState[action.trayId], action.projects)
      break
    }
    default :
    {
      return true
    }
  }

  LocalRepository.setItem(storageKey, _storeState)
  eventEmitter.emit(CHANGE_EVENT)
  return true
})

module.exports = {
  dispatchToken,

  getAll(trayId) {
    return _storeState[trayId]
  },

  addListener(callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  },

  validate(obj) {
    if (!_.has(obj, storageKey)) {
      return [`The top level key ${storageKey} is missing!`]
    }
    if (!_.isPlainObject(obj[storageKey])) {
      return [`The top level key ${storageKey} must be an object!`]
    }
  }
}
