import {Actions} from '../Actions'
import {projectSelected, projectsFetched, trayAdded, trayRemoved, trayUpdated} from './TrackingActionCreators'
import {buildProject} from '../testHelpers'
import {AuthTypes} from '../domain/Tray'

describe(Actions.TRAY_ADDED, () => {

  it('should return the correct type', () => {
    const actual = trayAdded('irrelevant', 'irrelevant', AuthTypes.none, '', '', '')
    expect(actual).toHaveProperty('type', Actions.TRAY_ADDED)
  })

  it('should return the tray id', () => {
    const actual = trayAdded('some-tray-id', 'irrelevant', AuthTypes.none, '', '', '')
    expect(actual).toHaveProperty('trayId', 'some-tray-id')
    expect(actual.data).toHaveProperty('trayId', 'some-tray-id')
  })

  it('should return the tray url', () => {
    const actual = trayAdded('irrelevant', 'some-url', AuthTypes.none, '', '', '')
    expect(actual.data).toHaveProperty('url', 'some-url')
  })

  it('should return the tray username', () => {
    const username = 'some-username'
    const password = 'irrelevant'
    const actual = trayAdded('irrelevant', 'irrelevant', AuthTypes.basic, username, password, '')
    expect(actual.data).toHaveProperty('username', 'some-username')
  })

  it('should return a generated tray name', () => {
    const actual = trayAdded('irrelevant', 'irrelevant', AuthTypes.none, '', '', '')
    expect(actual.data.name).not.toBeNull()
  })
})

describe(Actions.TRAY_UPDATED, () => {

  it('should return the correct type', () => {
    const actual = trayUpdated('trayId', {})
    expect(actual).toHaveProperty('type', Actions.TRAY_UPDATED)
  })

  it('should return the data', () => {
    const actual = trayUpdated('trayId', {})
    expect(actual).toHaveProperty('data', {})
  })
})

describe(Actions.TRAY_REMOVED, () => {

  it('should return the correct type', () => {
    const actual = trayRemoved('irrelevant')
    expect(actual).toHaveProperty('type', Actions.TRAY_REMOVED)
  })

  it('should return the tray id', () => {
    const actual = trayRemoved('some-tray-id')
    expect(actual).toHaveProperty('trayId', 'some-tray-id')
  })
})

describe(Actions.PROJECTS_FETCHED, () => {

  it('should return the correct type', () => {
    const actual = projectsFetched('irrelevant', [], false)
    expect(actual).toHaveProperty('type', Actions.PROJECTS_FETCHED)
  })

  it('should return the tray id', () => {
    const actual = projectsFetched('some-tray-id', [], false)
    expect(actual).toHaveProperty('trayId', 'some-tray-id')
  })

  it('should return the projects', () => {
    const actual = projectsFetched('irrelevant', [buildProject({webUrl: 'bar'})], false)
    expect(actual.data[0]).toHaveProperty('webUrl', 'bar')
  })

  it('should return a timestamp', () => {
    const actual = projectsFetched('irrelevant', [], false)
    expect(actual).toHaveProperty('timestamp')
  })

  it('should return the server type', () => {
    const actual = projectsFetched('irrelevant', [buildProject({serverType: 'some-type'})], false)
    expect(actual).toHaveProperty('serverType', 'some-type')
  })

  it('should return whether to include new projects or not', () => {
    const actual = projectsFetched('irrelevant', [], true)
    expect(actual).toHaveProperty('includeNew', true)
  })
})

describe(Actions.PROJECT_SELECTED, () => {

  it('should return the correct type', () => {
    const actual = projectSelected('irrelevant', 'irrelevant', false)
    expect(actual).toHaveProperty('type', Actions.PROJECT_SELECTED)
  })

  it('should return the tray id', () => {
    const actual = projectSelected('some-tray-id', 'irrelevant', false)
    expect(actual).toHaveProperty('trayId', 'some-tray-id')
  })

  it('should return the web url', () => {
    const actual = projectSelected('irrelevant', 'some-project-url', false)
    expect(actual).toHaveProperty('projectId', 'some-project-url')
  })

  it('should return if the project was selected', () => {
    const actual = projectSelected('irrelevant', 'irrelevant', true)
    expect(actual).toHaveProperty('selected', true)
  })
})
