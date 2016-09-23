export const SELECT_PROJECT = 'SELECT_PROJECT'
export function selectProject(trayId, projectId, selected) {
  return {
    type: SELECT_PROJECT,
    trayId,
    projectId,
    selected
  }
}
