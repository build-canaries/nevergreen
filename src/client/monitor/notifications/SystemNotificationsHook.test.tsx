import React from 'react'
import * as SystemNotifications from '../../common/SystemNotifications'
import {Prognosis, Projects} from '../../domain/Project'
import {useSystemNotifications} from './SystemNotificationsHook'
import {buildProject, render} from '../../testHelpers'
import {SETTINGS_ROOT} from '../../settings/SettingsReducer'

function HookWrapper({projects}: { projects: Projects }) {
  useSystemNotifications(projects)
  return <div/>
}

beforeEach(() => {
  jest.spyOn(SystemNotifications, 'sendSystemNotification').mockResolvedValue()
})

it('should not send notifications regardless of project transitions if system notifications are off', () => {
  const state = {
    [SETTINGS_ROOT]: {
      showSystemNotifications: false
    }
  }
  const projects = [
    buildProject({
      projectId: 'some-id',
      description: 'some-name',
      previousPrognosis: Prognosis.healthyBuilding,
      prognosis: Prognosis.sick
    })
  ]

  render(<HookWrapper projects={projects}/>, {state})

  expect(SystemNotifications.sendSystemNotification).not.toBeCalled()
})

it('should send sick notification when project becomes sick', () => {
  const state = {
    [SETTINGS_ROOT]: {
      showSystemNotifications: true
    }
  }
  const projects = [
    buildProject({
      projectId: 'some-id',
      description: 'some-name',
      previousPrognosis: Prognosis.healthyBuilding,
      prognosis: Prognosis.sick
    })
  ]

  render(<HookWrapper projects={projects}/>, {state})

  expect(SystemNotifications.sendSystemNotification).toBeCalledWith({title: 'project is sick!', body: 'some-name'})
})

it('should send not sick notification when project is no longer sick', () => {
  const state = {
    [SETTINGS_ROOT]: {
      showSystemNotifications: true
    }
  }
  const projects = [
    buildProject({
      projectId: 'some-id',
      description: 'some-name',
      previousPrognosis: Prognosis.sick,
      prognosis: Prognosis.sickBuilding
    })
  ]

  render(<HookWrapper projects={projects}/>, {state})

  expect(SystemNotifications.sendSystemNotification).toBeCalledWith({
    title: 'project is no longer sick!',
    body: 'some-name'
  })
})

it('should not send sick notifications when project is still sick', () => {
  const state = {
    [SETTINGS_ROOT]: {
      showSystemNotifications: true
    }
  }
  const projects = [
    buildProject({
      projectId: 'some-id',
      description: 'some-name',
      previousPrognosis: Prognosis.sick,
      prognosis: Prognosis.sick
    })
  ]

  render(<HookWrapper projects={projects}/>, {state})

  expect(SystemNotifications.sendSystemNotification).not.toBeCalled()
})
