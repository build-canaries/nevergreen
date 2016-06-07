import AppDispatcher from '../dispatcher/AppDispatcher'
import {encryptPassword} from '../gateways/securityGateway'
import {fetchAll} from '../gateways/projectsGateway'
import trayStore from '../stores/TrayStore'
import uuid from 'node-uuid'
import moment from 'moment'
import _ from 'lodash'

function hasScheme(url) {
  return _.size(_.split(url, '://')) > 1
}

export const TrayAdd = 'tray-add'
export function addTray(enteredUrl, username, password) {
  const trayId = uuid.v4()

  const url = hasScheme(enteredUrl) ? enteredUrl : 'http://' + enteredUrl

  AppDispatcher.dispatch({
    type: TrayAdd,
    trayId,
    url,
    username
  })

  if (_.size(password) > 0) {
    encryptPasswordAndRefresh(trayId, url, username, password)
  } else {
    refreshTray({trayId, url, username})
  }
}

export const TrayUpdate = 'tray-update'
export function updateTray(trayId, name, url, username, password) {
  const passwordSame = trayStore.getById(trayId).password === password
  const newPassword = passwordSame ? '' : password

  AppDispatcher.dispatch({
    type: TrayUpdate,
    trayId,
    name,
    url,
    username
  })

  if (passwordSame) {
    refreshTray({trayId, url, username, password})
  } else {
    if (_.size(newPassword) > 0) {
      encryptPasswordAndRefresh(trayId, url, username, password)
    } else {
      AppDispatcher.dispatch({
        type: PasswordEncrypted,
        trayId,
        password: ''
      })
      refreshTray({trayId, url, username, password})
    }
  }
}

export const TrayRemove = 'tray-remove'
export function removeTray(trayId) {
  AppDispatcher.dispatch({
    type: TrayRemove,
    trayId
  })
}

export const ProjectsFetching = 'projects-fetching'
export const ProjectsFetched = 'projects-fetched'
export const ProjectsFetchError = 'projects-fetch-error'
export function refreshTray(tray) {
  AppDispatcher.dispatch({
    type: ProjectsFetching,
    trayId: tray.trayId
  })
  fetchAll([tray]).then((projects) => {
    AppDispatcher.dispatch({
      type: ProjectsFetched,
      trayId: tray.trayId,
      projects,
      timestamp: moment().format()
    })
  }).catch((error) => {
    AppDispatcher.dispatch({
      type: ProjectsFetchError,
      trayId: tray.trayId,
      error,
      timestamp: moment().format()
    })
  })
}

export const PasswordEncrypted = 'password-encrypted'
function encryptPasswordAndRefresh(trayId, url, username, password) {
  encryptPassword(password).then(({password}) => {
    AppDispatcher.dispatch({
      type: PasswordEncrypted,
      trayId,
      password
    })
    refreshTray({trayId, url, username, password})
  })
}
