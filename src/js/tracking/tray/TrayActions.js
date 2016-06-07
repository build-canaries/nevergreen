import AppDispatcher from '../../common/AppDispatcher'

export const ProjectSelected = 'project-selected'
export function selectProject(trayId, projectIds) {
  AppDispatcher.dispatch({
    type: ProjectSelected,
    trayId,
    projectIds
  })
}

export const ProjectUnselected = 'project-unselected'
export function removeProject(trayId, projectIds) {
  AppDispatcher.dispatch({
    type: ProjectUnselected,
    trayId,
    projectIds
  })
}

