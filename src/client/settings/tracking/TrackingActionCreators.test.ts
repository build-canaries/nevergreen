import {Actions} from '../../Actions'
import {feedAdded, feedRemoved, feedUpdated, projectSelected} from './TrackingActionCreators'
import {AuthTypes} from '../../domain/Feed'

describe(Actions.FEED_ADDED, () => {

  it('should return the correct type', () => {
    const actual = feedAdded('irrelevant', 'irrelevant', AuthTypes.none, '', '', '')
    expect(actual).toHaveProperty('type', Actions.FEED_ADDED)
  })

  it('should return the tray id', () => {
    const actual = feedAdded('some-tray-id', 'irrelevant', AuthTypes.none, '', '', '')
    expect(actual).toHaveProperty('trayId', 'some-tray-id')
    expect(actual.data).toHaveProperty('trayId', 'some-tray-id')
  })

  it('should return the tray url', () => {
    const actual = feedAdded('irrelevant', 'some-url', AuthTypes.none, '', '', '')
    expect(actual.data).toHaveProperty('url', 'some-url')
  })

  it('should return the tray username', () => {
    const username = 'some-username'
    const password = 'irrelevant'
    const actual = feedAdded('irrelevant', 'irrelevant', AuthTypes.basic, username, password, '')
    expect(actual.data).toHaveProperty('username', 'some-username')
  })

  it('should return a generated tray name', () => {
    const actual = feedAdded('irrelevant', 'irrelevant', AuthTypes.none, '', '', '')
    expect(actual.data.name).not.toBeNull()
  })
})

describe(Actions.FEED_UPDATED, () => {

  it('should return the correct type', () => {
    const actual = feedUpdated('trayId', {})
    expect(actual).toHaveProperty('type', Actions.FEED_UPDATED)
  })

  it('should return the data', () => {
    const actual = feedUpdated('trayId', {})
    expect(actual).toHaveProperty('data', {})
  })
})

describe(Actions.FEED_REMOVED, () => {

  it('should return the correct type', () => {
    const actual = feedRemoved('irrelevant')
    expect(actual).toHaveProperty('type', Actions.FEED_REMOVED)
  })

  it('should return the tray id', () => {
    const actual = feedRemoved('some-tray-id')
    expect(actual).toHaveProperty('trayId', 'some-tray-id')
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
