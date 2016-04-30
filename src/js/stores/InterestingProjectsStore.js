import AppDispatcher from '../dispatcher/AppDispatcher'
import {EventEmitter} from 'events'
import {AppInit, InterestingProjects, InterestingProjectsError} from '../constants/NevergreenConstants'

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
    case InterestingProjects:
    {
      _storeState.projects = action.projects.map(toProject)
      _storeState.error = null
      break
    }
    case InterestingProjectsError:
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
