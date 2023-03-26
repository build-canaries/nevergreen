import * as SystemNotifications from '../../common/SystemNotifications'
import { Prognosis, ProjectPrognosis, Projects } from '../../domain/Project'
import { render } from '../../testUtils/testHelpers'
import { buildFeedError, buildProject } from '../../testUtils/builders'
import { notificationsRoot } from '../../settings/notifications/NotificationsReducer'
import { useNotifications } from './NotificationsHook'
import { FeedErrors } from '../../domain/FeedError'
import * as AudioPlayer from '../../common/AudioPlayer'
import { displaySettingsRoot } from '../../settings/display/DisplaySettingsReducer'
import { personalSettingsRoot } from '../../settings/PersonalSettingsReducer'

interface PrognosisTest {
  readonly previous: ProjectPrognosis
  readonly current: ProjectPrognosis
}

function HookWrapper({
  projects,
  errors,
}: {
  projects: Projects
  errors: FeedErrors
}) {
  useNotifications(projects, errors)
  return <div />
}

beforeEach(() => {
  jest.spyOn(SystemNotifications, 'sendSystemNotification').mockResolvedValue()
  jest.spyOn(AudioPlayer, 'playAudio').mockResolvedValue()
})

describe('system notifications', () => {
  it('should not send regardless of project transitions if they are globally turned off', () => {
    const state = {
      [notificationsRoot]: {
        allowSystemNotifications: false,
        notifications: {
          [Prognosis.sick]: { systemNotification: true, sfx: '' },
        },
      },
    }
    const projects = [
      buildProject({
        projectId: 'some-id',
        description: 'some-name',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.sick,
      }),
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors} />, { state })

    expect(SystemNotifications.sendSystemNotification).not.toBeCalled()
  })

  it.each`
    previous                     | current
    ${Prognosis.healthyBuilding} | ${Prognosis.sick}
    ${Prognosis.healthyBuilding} | ${Prognosis.sickBuilding}
    ${Prognosis.healthy}         | ${Prognosis.healthyBuilding}
    ${Prognosis.healthyBuilding} | ${Prognosis.healthy}
    ${Prognosis.healthyBuilding} | ${Prognosis.unknown}
  `(
    'should send notification for transition $previous -> $current',
    ({ previous, current }: PrognosisTest) => {
      const state = {
        [notificationsRoot]: {
          notifications: {
            [current]: { systemNotification: true, sfx: '' },
          },
        },
        [personalSettingsRoot]: {
          allowSystemNotifications: true,
        },
      }
      const projects = [
        buildProject({
          projectId: 'some-id',
          description: 'some-name',
          previousPrognosis: previous,
          prognosis: current,
        }),
      ]
      const errors: FeedErrors = []

      render(<HookWrapper projects={projects} errors={errors} />, { state })

      expect(SystemNotifications.sendSystemNotification).toBeCalledWith(
        expect.objectContaining({
          title: `project is ${current}!`,
          body: 'some-name',
        })
      )
    }
  )

  it('should send notification for first transition to a feed error', () => {
    const state = {
      [notificationsRoot]: {
        notifications: {
          [Prognosis.error]: { systemNotification: true, sfx: '' },
        },
      },
      [personalSettingsRoot]: {
        allowSystemNotifications: true,
      },
    }
    const projects: Projects = []
    const errorsFirstFetch = [
      buildFeedError({
        description: 'some-error',
        prognosis: Prognosis.error,
        previousPrognosis: undefined,
      }),
    ]
    const errorsSecondFetch = [
      buildFeedError({
        description: 'some-error',
        prognosis: Prognosis.error,
        previousPrognosis: Prognosis.error,
      }),
    ]

    const { rerender } = render(
      <HookWrapper projects={projects} errors={errorsFirstFetch} />,
      { state }
    )

    expect(SystemNotifications.sendSystemNotification).toBeCalledWith(
      expect.objectContaining({
        title: 'feed error!',
        body: 'some-error',
      })
    )

    rerender(<HookWrapper projects={projects} errors={errorsSecondFetch} />)

    expect(SystemNotifications.sendSystemNotification).toBeCalledTimes(1)
  })

  it('should send multiple notifications', () => {
    const state = {
      [notificationsRoot]: {
        notifications: {
          [Prognosis.sick]: { systemNotification: true, sfx: '' },
          [Prognosis.healthy]: { systemNotification: true, sfx: '' },
        },
      },
      [personalSettingsRoot]: {
        allowSystemNotifications: true,
      },
    }
    const projects = [
      buildProject({
        projectId: 'some-id',
        description: 'some-name',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.sick,
      }),
      buildProject({
        projectId: 'another-id',
        description: 'another-name',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.healthy,
      }),
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors} />, { state })

    expect(SystemNotifications.sendSystemNotification).toBeCalledWith(
      expect.objectContaining({
        title: 'project is healthy!',
        body: 'another-name',
      })
    )
    expect(SystemNotifications.sendSystemNotification).toBeCalledWith(
      expect.objectContaining({
        title: 'project is sick!',
        body: 'some-name',
      })
    )
  })

  it('should not send notifications when project is still in same prognosis', () => {
    const state = {
      [notificationsRoot]: {
        notifications: {
          [Prognosis.sick]: { systemNotification: true, sfx: '' },
        },
      },
      [personalSettingsRoot]: {
        allowSystemNotifications: true,
      },
    }
    const projects = [
      buildProject({
        projectId: 'some-id',
        description: 'some-name',
        previousPrognosis: Prognosis.sick,
        prognosis: Prognosis.sick,
      }),
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors} />, { state })

    expect(SystemNotifications.sendSystemNotification).not.toBeCalled()
  })
})

describe('audio notifications', () => {
  it('should not play regardless of project transitions if they are globally turned off', () => {
    const state = {
      [notificationsRoot]: {
        notifications: {
          [Prognosis.sick]: { systemNotification: false, sfx: 'some-sfx.mp3' },
        },
      },
      [personalSettingsRoot]: {
        allowAudioNotifications: false,
      },
    }
    const projects = [
      buildProject({
        projectId: 'some-id',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.sick,
      }),
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors} />, { state })

    expect(AudioPlayer.playAudio).not.toHaveBeenCalled()
  })

  it.each`
    previous                     | current
    ${Prognosis.healthyBuilding} | ${Prognosis.sick}
    ${Prognosis.healthyBuilding} | ${Prognosis.sickBuilding}
    ${Prognosis.healthy}         | ${Prognosis.healthyBuilding}
    ${Prognosis.healthyBuilding} | ${Prognosis.healthy}
    ${Prognosis.healthyBuilding} | ${Prognosis.unknown}
  `(
    'should play notification for transition $previous -> $current',
    ({ previous, current }: PrognosisTest) => {
      const state = {
        [notificationsRoot]: {
          notifications: {
            [current]: { systemNotification: false, sfx: 'some-sfx.mp3' },
          },
        },
        [personalSettingsRoot]: {
          allowAudioNotifications: true,
        },
      }
      const projects = [
        buildProject({
          projectId: 'some-id',
          description: 'some-name',
          previousPrognosis: previous,
          prognosis: current,
        }),
      ]
      const errors: FeedErrors = []

      render(<HookWrapper projects={projects} errors={errors} />, { state })

      expect(AudioPlayer.playAudio).toHaveBeenCalledWith('some-sfx.mp3', 1)
    }
  )

  it('should only play one notification at a time even if multiple projects transition to valid prognosis', () => {
    const state = {
      [notificationsRoot]: {
        notifications: {
          [Prognosis.sick]: { systemNotification: false, sfx: 'some-sfx.mp3' },
          [Prognosis.healthy]: {
            systemNotification: false,
            sfx: 'another-sfx.mp3',
          },
        },
      },
      [personalSettingsRoot]: {
        allowAudioNotifications: true,
      },
    }
    const projects = [
      buildProject({
        projectId: 'some-id',
        description: 'some-name',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.sick,
      }),
      buildProject({
        projectId: 'another-id',
        description: 'another-name',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.healthy,
      }),
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors} />, { state })

    expect(AudioPlayer.playAudio).toHaveBeenCalledWith('some-sfx.mp3', 1)
    expect(AudioPlayer.playAudio).not.toHaveBeenCalledWith('another-sfx.mp3', 1)
  })

  it('should not play more notifications if a previous notification is still playing', () => {
    jest.spyOn(AudioPlayer, 'anyAudioPlaying').mockReturnValueOnce(false)

    const state = {
      [notificationsRoot]: {
        notifications: {
          [Prognosis.sick]: { systemNotification: false, sfx: 'some-sfx.mp3' },
          [Prognosis.healthy]: {
            systemNotification: false,
            sfx: 'another-sfx.mp3',
          },
        },
      },
      [personalSettingsRoot]: {
        allowAudioNotifications: true,
      },
    }
    const firstRender = [
      buildProject({
        projectId: 'some-id',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.sick,
      }),
    ]
    const secondRender = [
      buildProject({
        projectId: 'another-id',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.healthy,
      }),
    ]
    const errors: FeedErrors = []

    const { rerender } = render(
      <HookWrapper projects={firstRender} errors={errors} />,
      { state }
    )

    jest.spyOn(AudioPlayer, 'anyAudioPlaying').mockReturnValue(true)

    rerender(<HookWrapper projects={secondRender} errors={errors} />)

    expect(AudioPlayer.playAudio).toHaveBeenCalledWith('some-sfx.mp3', 1)
    expect(AudioPlayer.playAudio).not.toHaveBeenCalledWith('another-sfx.mp3', 1)
  })

  it('should not play notifications when project is still in same prognosis', () => {
    const state = {
      [notificationsRoot]: {
        notifications: {
          [Prognosis.sick]: { systemNotification: false, sfx: 'some-sfx.mp3' },
        },
      },
      [personalSettingsRoot]: {
        allowAudioNotifications: true,
      },
    }
    const projects = [
      buildProject({
        projectId: 'some-id',
        description: 'some-name',
        previousPrognosis: Prognosis.sick,
        prognosis: Prognosis.sick,
      }),
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors} />, { state })

    expect(AudioPlayer.playAudio).not.toHaveBeenCalled()
  })

  it('should not play audio notification if nothing has changed', () => {
    const state = {
      [notificationsRoot]: {
        notifications: {
          [Prognosis.sick]: { systemNotification: false, sfx: 'some-sfx.mp3' },
        },
      },
      [personalSettingsRoot]: {
        allowAudioNotifications: true,
      },
    }
    const projectsFirstFetch = [
      buildProject({
        projectId: 'some-id',
        description: 'some-name',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.sick,
      }),
    ]
    const projectsSecondFetch = [
      buildProject({
        projectId: 'some-id',
        description: 'some-name',
        previousPrognosis: Prognosis.sick,
        prognosis: Prognosis.sick,
      }),
    ]
    const errors: FeedErrors = []

    const { rerender } = render(
      <HookWrapper projects={projectsFirstFetch} errors={errors} />,
      { state }
    )
    rerender(<HookWrapper projects={projectsSecondFetch} errors={errors} />)

    expect(AudioPlayer.playAudio).toHaveBeenCalledTimes(1)
  })
})

describe('browser title', () => {
  it('should update the title with a summary', () => {
    const state = {
      [displaySettingsRoot]: {
        showPrognosis: [
          Prognosis.sick,
          Prognosis.sickBuilding,
          Prognosis.healthyBuilding,
          Prognosis.unknown,
          Prognosis.healthy,
        ],
      },
    }
    const projects = [
      buildProject({
        projectId: '1',
        prognosis: Prognosis.sick,
      }),
      buildProject({
        projectId: '2',
        prognosis: Prognosis.sickBuilding,
      }),
      buildProject({
        projectId: '3',
        prognosis: Prognosis.healthyBuilding,
      }),
      buildProject({
        projectId: '4',
        prognosis: Prognosis.unknown,
      }),
      buildProject({
        projectId: '5',
        prognosis: Prognosis.healthy,
      }),
    ]
    const errors: FeedErrors = [
      buildFeedError({
        description: 'feed-error',
      }),
    ]

    render(<HookWrapper projects={projects} errors={errors} />, { state })

    expect(document).toHaveProperty(
      'title',
      '1 Error, 1 Sick, 1 Sick building, 1 Healthy building, 1 Unknown, 1 Healthy'
    )
  })

  it('should exclude prognoses that have no projects', () => {
    const state = {
      [displaySettingsRoot]: {
        showPrognosis: [
          Prognosis.sick,
          Prognosis.sickBuilding,
          Prognosis.healthyBuilding,
          Prognosis.unknown,
          Prognosis.healthy,
        ],
      },
    }
    const projects = [
      buildProject({
        projectId: '1',
        prognosis: Prognosis.sick,
      }),
      buildProject({
        projectId: '2',
        prognosis: Prognosis.healthy,
      }),
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors} />, { state })

    expect(document).toHaveProperty('title', '1 Sick, 1 Healthy')
  })

  it('should count projects in each prognosis', () => {
    const state = {
      [displaySettingsRoot]: {
        showPrognosis: [
          Prognosis.sick,
          Prognosis.sickBuilding,
          Prognosis.healthyBuilding,
          Prognosis.unknown,
          Prognosis.healthy,
        ],
      },
    }
    const projects = [
      buildProject({
        projectId: '1',
        prognosis: Prognosis.sick,
      }),
      buildProject({
        projectId: '2',
        prognosis: Prognosis.sick,
      }),
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors} />, { state })

    expect(document).toHaveProperty('title', '2 Sick')
  })

  it('should set title to Monitor if no projects', () => {
    const projects: Projects = []
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors} />)

    expect(document).toHaveProperty('title', 'Monitor')
  })

  it('should only show interesting projects', () => {
    const state = {
      [displaySettingsRoot]: {
        showPrognosis: [Prognosis.sick, Prognosis.healthy],
      },
    }
    const projects = [
      buildProject({
        projectId: '1',
        prognosis: Prognosis.sick,
      }),
      buildProject({
        projectId: '2',
        prognosis: Prognosis.sickBuilding,
      }),
      buildProject({
        projectId: '3',
        prognosis: Prognosis.healthyBuilding,
      }),
      buildProject({
        projectId: '4',
        prognosis: Prognosis.unknown,
      }),
      buildProject({
        projectId: '5',
        prognosis: Prognosis.healthy,
      }),
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors} />, { state })

    expect(document).toHaveProperty('title', '1 Sick, 1 Healthy')
  })
})
