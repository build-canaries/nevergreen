import React from 'react'
import * as SystemNotifications from '../../common/SystemNotifications'
import {Prognosis, prognosisDisplay, ProjectPrognosis, Projects} from '../../domain/Project'
import {render} from '../../testUtils/testHelpers'
import {buildFeedError, buildProject} from '../../testUtils/builders'
import {NOTIFICATIONS_ROOT} from '../../settings/notifications/NotificationsReducer'
import {useNotifications} from './NotificationsHook'
import {FeedErrors} from '../../domain/FeedError'
import * as AudioPlayer from '../../common/AudioPlayer'
import capitalize from 'lodash/capitalize'

interface PrognosisTest {
  readonly previous: ProjectPrognosis,
  readonly current: ProjectPrognosis
}

function HookWrapper({projects, errors}: { projects: Projects, errors: FeedErrors }) {
  useNotifications(projects, errors)
  return <div/>
}

beforeEach(() => {
  jest.spyOn(SystemNotifications, 'sendSystemNotification').mockResolvedValue()
  jest.spyOn(AudioPlayer, 'playAudio').mockResolvedValue()
})

describe('system notifications', () => {

  it('should not send regardless of project transitions if they are globally turned off', () => {
    const state = {
      [NOTIFICATIONS_ROOT]: {
        allowSystemNotifications: false,
        notifications: {
          [Prognosis.sick]: {systemNotification: true, sfx: ''}
        }
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
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors}/>, {state})

    expect(SystemNotifications.sendSystemNotification).not.toBeCalled()
  })

  it.each`
    previous                     | current
    ${Prognosis.healthyBuilding} | ${Prognosis.sick}
    ${Prognosis.healthyBuilding} | ${Prognosis.sickBuilding}
    ${Prognosis.healthy}         | ${Prognosis.healthyBuilding}
    ${Prognosis.healthyBuilding} | ${Prognosis.healthy}
    ${Prognosis.healthyBuilding} | ${Prognosis.unknown}
  `('should send notification for transition $previous -> $current', ({previous, current}: PrognosisTest) => {
    const state = {
      [NOTIFICATIONS_ROOT]: {
        allowSystemNotifications: true,
        notifications: {
          [current]: {systemNotification: true, sfx: ''}
        }
      }
    }
    const projects = [
      buildProject({
        projectId: 'some-id',
        description: 'some-name',
        previousPrognosis: previous,
        prognosis: current
      })
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors}/>, {state})

    expect(SystemNotifications.sendSystemNotification).toBeCalledWith(expect.objectContaining({
      title: `project is ${current}!`,
      body: 'some-name'
    }))
  })

  it('should send notification for first transition to a feed error', () => {
    const state = {
      [NOTIFICATIONS_ROOT]: {
        allowSystemNotifications: true,
        notifications: {
          [Prognosis.error]: {systemNotification: true, sfx: ''}
        }
      }
    }
    const projects: Projects = []
    const errorsFirstFetch = [
      buildFeedError({
        description: 'some-error',
        prognosis: Prognosis.error,
        previousPrognosis: undefined
      })
    ]
    const errorsSecondFetch = [
      buildFeedError({
        description: 'some-error',
        prognosis: Prognosis.error,
        previousPrognosis: Prognosis.error
      })
    ]

    const {rerender} = render(<HookWrapper projects={projects} errors={errorsFirstFetch}/>, {state})

    expect(SystemNotifications.sendSystemNotification).toBeCalledWith(expect.objectContaining({
      title: 'feed error!',
      body: 'some-error'
    }))

    rerender(<HookWrapper projects={projects} errors={errorsSecondFetch}/>)

    expect(SystemNotifications.sendSystemNotification).toBeCalledTimes(1)
  })

  it('should send multiple notifications', () => {
    const state = {
      [NOTIFICATIONS_ROOT]: {
        allowSystemNotifications: true,
        notifications: {
          [Prognosis.sick]: {systemNotification: true, sfx: ''},
          [Prognosis.healthy]: {systemNotification: true, sfx: ''}
        }
      }
    }
    const projects = [
      buildProject({
        projectId: 'some-id',
        description: 'some-name',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.sick
      }),
      buildProject({
        projectId: 'another-id',
        description: 'another-name',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.healthy
      })
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors}/>, {state})

    expect(SystemNotifications.sendSystemNotification).toBeCalledWith(expect.objectContaining({
      title: 'project is healthy!',
      body: 'another-name'
    }))
    expect(SystemNotifications.sendSystemNotification).toBeCalledWith(expect.objectContaining({
      title: 'project is sick!',
      body: 'some-name'
    }))
  })

  it('should not send notifications when project is still in same prognosis', () => {
    const state = {
      [NOTIFICATIONS_ROOT]: {
        allowSystemNotifications: true,
        notifications: {
          [Prognosis.sick]: {systemNotification: true, sfx: ''}
        }
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
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors}/>, {state})

    expect(SystemNotifications.sendSystemNotification).not.toBeCalled()
  })
})

describe('audio notifications', () => {

  it('should not play regardless of project transitions if they are globally turned off', () => {
    const state = {
      [NOTIFICATIONS_ROOT]: {
        allowAudioNotifications: false,
        notifications: {
          [Prognosis.sick]: {systemNotification: false, sfx: 'some-sfx.mp3'}
        }
      }
    }
    const projects = [
      buildProject({
        projectId: 'some-id',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.sick
      })
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors}/>, {state})

    expect(AudioPlayer.playAudio).not.toHaveBeenCalled()
  })

  it.each`
    previous                     | current
    ${Prognosis.healthyBuilding} | ${Prognosis.sick}
    ${Prognosis.healthyBuilding} | ${Prognosis.sickBuilding}
    ${Prognosis.healthy}         | ${Prognosis.healthyBuilding}
    ${Prognosis.healthyBuilding} | ${Prognosis.healthy}
    ${Prognosis.healthyBuilding} | ${Prognosis.unknown}
  `('should play notification for transition $previous -> $current', ({previous, current}: PrognosisTest) => {
    jest.spyOn(AudioPlayer, 'playAudio').mockResolvedValue()

    const state = {
      [NOTIFICATIONS_ROOT]: {
        allowAudioNotifications: true,
        notifications: {
          [current]: {systemNotification: false, sfx: 'some-sfx.mp3'}
        }
      }
    }
    const projects = [
      buildProject({
        projectId: 'some-id',
        description: 'some-name',
        previousPrognosis: previous,
        prognosis: current
      })
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors}/>, {state})

    expect(AudioPlayer.playAudio).toHaveBeenCalledWith('some-sfx.mp3')
  })

  it('should only play one notification at a time even if multiple projects transition to valid prognosis', () => {
    const state = {
      [NOTIFICATIONS_ROOT]: {
        allowAudioNotifications: true,
        notifications: {
          [Prognosis.sick]: {systemNotification: false, sfx: 'some-sfx.mp3'},
          [Prognosis.healthy]: {systemNotification: false, sfx: 'another-sfx.mp3'}
        }
      }
    }
    const projects = [
      buildProject({
        projectId: 'some-id',
        description: 'some-name',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.sick
      }),
      buildProject({
        projectId: 'another-id',
        description: 'another-name',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.healthy
      })
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors}/>, {state})

    expect(AudioPlayer.playAudio).toHaveBeenCalledWith('some-sfx.mp3')
    expect(AudioPlayer.playAudio).not.toHaveBeenCalledWith('another-sfx.mp3')
  })

  it('should not play more notifications if a previous notification is still playing', () => {
    jest.spyOn(AudioPlayer, 'anyAudioPlaying').mockReturnValue(false)

    const state = {
      [NOTIFICATIONS_ROOT]: {
        allowAudioNotifications: true,
        notifications: {
          [Prognosis.sick]: {systemNotification: false, sfx: 'some-sfx.mp3'},
          [Prognosis.healthy]: {systemNotification: false, sfx: 'another-sfx.mp3'},
        }
      }
    }
    const firstRender = [
      buildProject({
        projectId: 'some-id',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.sick
      })
    ]
    const secondRender = [
      buildProject({
        projectId: 'another-id',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.healthy
      })
    ]
    const errors: FeedErrors = []

    const {rerender} = render(<HookWrapper projects={firstRender} errors={errors}/>, {state})

    jest.spyOn(AudioPlayer, 'anyAudioPlaying').mockReturnValue(true)

    rerender(<HookWrapper projects={secondRender} errors={errors}/>)

    expect(AudioPlayer.playAudio).toHaveBeenCalledWith('some-sfx.mp3')
    expect(AudioPlayer.playAudio).not.toHaveBeenCalledWith('another-sfx.mp3')
  })

  it('should not play notifications when project is still in same prognosis', () => {
    const state = {
      [NOTIFICATIONS_ROOT]: {
        allowAudioNotifications: true,
        notifications: {
          [Prognosis.sick]: {systemNotification: false, sfx: 'some-sfx.mp3'}
        }
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
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors}/>, {state})

    expect(AudioPlayer.playAudio).not.toHaveBeenCalled()
  })

  it('should not play audio notification if nothing has changed', () => {
    jest.spyOn(AudioPlayer, 'playAudio').mockResolvedValue()

    const state = {
      [NOTIFICATIONS_ROOT]: {
        allowAudioNotifications: true,
        notifications: {
          [Prognosis.sick]: {systemNotification: false, sfx: 'some-sfx.mp3'}
        }
      }
    }
    const projectsFirstFetch = [
      buildProject({
        projectId: 'some-id',
        description: 'some-name',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.sick
      })
    ]
    const projectsSecondFetch = [
      buildProject({
        projectId: 'some-id',
        description: 'some-name',
        previousPrognosis: Prognosis.sick,
        prognosis: Prognosis.sick
      })
    ]
    const errors: FeedErrors = []

    const {rerender} = render(<HookWrapper projects={projectsFirstFetch} errors={errors}/>, {state})
    rerender(<HookWrapper projects={projectsSecondFetch} errors={errors}/>)

    expect(AudioPlayer.playAudio).toHaveBeenCalledTimes(1)
  })
})

describe('browser title', () => {

  it.each<ProjectPrognosis>([
    Prognosis.sick,
    Prognosis.sickBuilding,
    Prognosis.healthyBuilding,
    Prognosis.healthy,
    Prognosis.unknown
  ])('should update title for %s', (current) => {
    const projects = [
      buildProject({
        projectId: 'some-id',
        description: 'some-name',
        prognosis: current
      })
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors}/>)

    expect(document).toHaveProperty('title', capitalize(prognosisDisplay(current)))
  })
})
