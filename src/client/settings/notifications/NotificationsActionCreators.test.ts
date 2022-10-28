import {
  addNotification,
  removeNotification,
  setAllowAudioNotifications,
  setAllowSystemNotifications,
  toggleVersionCheck
} from './NotificationsActionCreators'
import {Actions} from '../../Actions'
import {Prognosis} from '../../domain/Project'

describe(Actions.ALLOW_AUDIO_NOTIFICATIONS, () => {

  it('should return the correct type', () => {
    const actual = setAllowAudioNotifications(false)
    expect(actual).toHaveProperty('type', Actions.ALLOW_AUDIO_NOTIFICATIONS)
  })

  it('should return the given value', () => {
    const actual = setAllowAudioNotifications(true)
    expect(actual).toHaveProperty('value', true)
  })
})

describe(Actions.ALLOW_SYSTEM_NOTIFICATIONS, () => {

  it('should return the correct type', () => {
    const actual = setAllowSystemNotifications(false)
    expect(actual).toHaveProperty('type', Actions.ALLOW_SYSTEM_NOTIFICATIONS)
  })

  it('should return the given value', () => {
    const actual = setAllowSystemNotifications(true)
    expect(actual).toHaveProperty('value', true)
  })
})

describe(Actions.TOGGLE_VERSION_CHECK, () => {

  it('should return the correct type', () => {
    const actual = toggleVersionCheck()
    expect(actual).toHaveProperty('type', Actions.TOGGLE_VERSION_CHECK)
  })
})

describe(Actions.ADD_NOTIFICATION, () => {

  it('should return the correct type', () => {
    const actual = addNotification(Prognosis.sick, true, '')
    expect(actual).toHaveProperty('type', Actions.ADD_NOTIFICATION)
  })

  it('should return the prognosis', () => {
    const actual = addNotification(Prognosis.sick, true, '')
    expect(actual).toHaveProperty('prognosis', Prognosis.sick)
  })

  it('should return system notification', () => {
    const actual = addNotification(Prognosis.sick, true, '')
    expect(actual).toHaveProperty('systemNotification', true)
  })

  it('should return sfx', () => {
    const actual = addNotification(Prognosis.sick, true, 'some-sfx')
    expect(actual).toHaveProperty('sfx', 'some-sfx')
  })
})

describe(Actions.REMOVE_NOTIFICATION, () => {

  it('should return the correct type', () => {
    const actual = removeNotification(Prognosis.sick)
    expect(actual).toHaveProperty('type', Actions.REMOVE_NOTIFICATION)
  })

  it('should return the prognosis', () => {
    const actual = removeNotification(Prognosis.sick)
    expect(actual).toHaveProperty('prognosis', Prognosis.sick)
  })
})
