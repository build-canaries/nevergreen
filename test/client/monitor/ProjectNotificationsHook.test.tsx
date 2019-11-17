import React from 'react'
import * as SystemNotifications from '../../../src/client/common/SystemNotifications'
import {Prognosis, Project} from '../../../src/client/domain/Project'
import {useProjectNotifications} from '../../../src/client/monitor/ProjectNotificationsHook'
import {buildProject, render} from '../testHelpers'
import {SETTINGS_ROOT} from '../../../src/client/settings/SettingsReducer'

function HookWrapper({projects}: { projects: ReadonlyArray<Project> }) {
  useProjectNotifications(projects)
  return <div/>
}

beforeEach(() => {
  jest.spyOn(SystemNotifications, 'sendSystemNotification').mockResolvedValue()
})

it('should not send updates if nothing has changed', async () => {
  const state = {
    [SETTINGS_ROOT]: {
      showSystemNotifications: true
    }
  }
  const projects = [
    buildProject({prognosis: Prognosis.healthyBuilding})
  ]
  const {rerender} = render(<HookWrapper projects={projects}/>, state)
  rerender(<HookWrapper projects={projects}/>)

  expect(SystemNotifications.sendSystemNotification).not.toBeCalled()
})

it('should send sick notification when project becomes sick', async () => {
  const state = {
    [SETTINGS_ROOT]: {
      showSystemNotifications: true
    }
  }
  const projects1 = [
    buildProject({projectId: 'some-id', name: 'some-name', prognosis: Prognosis.healthyBuilding})
  ]
  const projects2 = [
    buildProject({projectId: 'some-id', name: 'some-name', prognosis: Prognosis.sick})
  ]
  const {rerender} = render(<HookWrapper projects={projects1}/>, state)
  rerender(<HookWrapper projects={projects2}/>)

  expect(SystemNotifications.sendSystemNotification).toBeCalledWith({title: 'project is sick!', body: 'some-name'})
})

it('should send not sick notification when project is no longer sick', async () => {
  const state = {
    [SETTINGS_ROOT]: {
      showSystemNotifications: true
    }
  }
  const projects1 = [
    buildProject({projectId: 'some-id', name: 'some-name', prognosis: Prognosis.sick})
  ]
  const projects2 = [
    buildProject({projectId: 'some-id', name: 'some-name', prognosis: Prognosis.sickBuilding})
  ]
  const {rerender} = render(<HookWrapper projects={projects1}/>, state)
  rerender(<HookWrapper projects={projects2}/>)

  expect(SystemNotifications.sendSystemNotification).toBeCalledWith({
    title: 'project is no longer sick!',
    body: 'some-name'
  })
})

it('should not send sick notifications when project is still sick', async () => {
  const state = {
    [SETTINGS_ROOT]: {
      showSystemNotifications: true
    }
  }
  const projects = [
    buildProject({projectId: 'some-id', name: 'some-name', prognosis: Prognosis.sick})
  ]
  const {rerender} = render(<HookWrapper projects={projects}/>, state)
  rerender(<HookWrapper projects={projects}/>)

  expect(SystemNotifications.sendSystemNotification).not.toBeCalled()
})
