import AppDispatcher from '../common/AppDispatcher'
import {EventEmitter} from 'events'
import {AppInit} from '../NevergreenActions'
import {INTERESTING_PROJECTS, INTERESTING_PROJECTS_ERROR} from '../monitor/MonitorActions'

const eventEmitter = new EventEmitter()
const CHANGE_EVENT = 'interesting-projects-change'

let _storeState = null

function getName(apiProject) {
  return apiProject.stage ? `${apiProject.name} ${apiProject.stage}` : apiProject.name
}

function toProject(apiProject) {
  return {
    projectId: apiProject.projectId,
    name: getName(apiProject),
    prognosis: apiProject.prognosis,
    lastBuildTime: apiProject.lastBuildTime
  }
}

const dispatchToken = AppDispatcher.register((action) => {
  switch (action.type) {
    case AppInit:
    {
      _storeState = {
        projects: [],
        error: null
      }
      break
    }
    case INTERESTING_PROJECTS:
    {
      _storeState.projects = action.projects.map(toProject)
      _storeState.error = null
      break
    }
    case INTERESTING_PROJECTS_ERROR:
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
  dispatchToken,

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
