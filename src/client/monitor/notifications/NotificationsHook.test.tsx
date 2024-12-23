import * as SystemNotifications from '../../common/SystemNotifications'
import {
  Prognosis,
  prognosisDisplay,
  ProjectPrognosis,
  Projects,
} from '../../domain/Project'
import { render } from '../../testUtils/testHelpers'
import { buildFeedError, buildProject } from '../../testUtils/builders'
import { useNotifications } from './NotificationsHook'
import { FeedErrors } from '../../domain/FeedError'
import * as AudioPlayer from '../../common/AudioPlayer'
import * as BrowserTitleSummaryHook from './BrowserTitleSummaryHook'
import * as SystemNotificationsHook from './SystemNotificationsHook'
import * as AudioNotificationsHook from './AudioNotificationsHook'
import { personalSettingsRoot } from '../../settings/PersonalSettingsReducer'
import { prognosisSettingsRoot } from '../../settings/prognosis/PrognosisSettingsReducer'

interface PrognosisTest {
  readonly previous: ProjectPrognosis
  readonly current: ProjectPrognosis
}

function HookWrapper({
  projects,
  errors,
  mute = false,
}: {
  projects: Projects
  errors: FeedErrors
  mute?: boolean
}) {
  useNotifications(projects, errors, mute)
  return <div />
}

beforeEach(() => {
  jest.spyOn(SystemNotifications, 'sendSystemNotification').mockResolvedValue()
  jest.spyOn(AudioPlayer, 'playAudio').mockResolvedValue()
})

it('should only pass interesting projects', () => {
  jest.spyOn(BrowserTitleSummaryHook, 'useBrowserTitleSummary')
  jest.spyOn(SystemNotificationsHook, 'useSystemNotifications')
  jest.spyOn(AudioNotificationsHook, 'useAudioNotifications')
  const state = {
    [prognosisSettingsRoot]: {
      [Prognosis.sick]: {
        systemNotification: true,
        sfx: 'some-audio',
        show: false,
      },
    },
    [personalSettingsRoot]: {
      allowSystemNotifications: true,
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
  ]
  const errors: FeedErrors = []

  render(<HookWrapper projects={projects} errors={errors} />, {
    state,
  })

  expect(BrowserTitleSummaryHook.useBrowserTitleSummary).toHaveBeenCalledWith(
    [],
    errors,
  )
  expect(SystemNotificationsHook.useSystemNotifications).toHaveBeenCalledWith(
    [],
    errors,
  )
  expect(AudioNotificationsHook.useAudioNotifications).toHaveBeenCalledWith(
    [],
    errors,
    expect.any(Boolean),
  )
})

describe('system notifications', () => {
  it('should not send regardless of project transitions if they are globally turned off', () => {
    const state = {
      [personalSettingsRoot]: {
        allowSystemNotifications: false,
      },
      [prognosisSettingsRoot]: {
        [Prognosis.sick]: { systemNotification: true, sfx: '', show: true },
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

    expect(SystemNotifications.sendSystemNotification).not.toHaveBeenCalled()
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
        [prognosisSettingsRoot]: {
          [current]: { systemNotification: true, sfx: '', show: true },
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

      expect(SystemNotifications.sendSystemNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          title: `project is ${prognosisDisplay(current)}!`,
          body: 'some-name',
        }),
      )
    },
  )

  it('should send notification for first transition to a feed error', () => {
    const state = {
      [prognosisSettingsRoot]: {
        [Prognosis.error]: { systemNotification: true, sfx: '', show: true },
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
      { state },
    )

    expect(SystemNotifications.sendSystemNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'feed error!',
        body: 'some-error',
      }),
    )

    rerender(<HookWrapper projects={projects} errors={errorsSecondFetch} />)

    expect(SystemNotifications.sendSystemNotification).toHaveBeenCalledTimes(1)
  })

  it('should send multiple notifications', () => {
    const state = {
      [prognosisSettingsRoot]: {
        [Prognosis.sick]: { systemNotification: true, sfx: '', show: true },
        [Prognosis.healthy]: { systemNotification: true, sfx: '', show: true },
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

    expect(SystemNotifications.sendSystemNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'project is healthy!',
        body: 'another-name',
      }),
    )
    expect(SystemNotifications.sendSystemNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'project is sick!',
        body: 'some-name',
      }),
    )
  })

  it('should not send notifications when project is still in same prognosis', () => {
    const state = {
      [prognosisSettingsRoot]: {
        [Prognosis.sick]: { systemNotification: true, sfx: '' },
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

    expect(SystemNotifications.sendSystemNotification).not.toHaveBeenCalled()
  })
})

describe('audio notifications', () => {
  it('should not play regardless of project transitions if they are globally turned off', () => {
    const state = {
      [prognosisSettingsRoot]: {
        [Prognosis.sick]: { systemNotification: false, sfx: 'some-sfx.mp3' },
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
        [prognosisSettingsRoot]: {
          [current]: {
            systemNotification: false,
            sfx: 'some-sfx.mp3',
            show: true,
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
    },
  )

  it('should not play notification if muted', () => {
    const state = {
      [prognosisSettingsRoot]: {
        [Prognosis.healthyBuilding]: {
          systemNotification: false,
          sfx: 'some-sfx.mp3',
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
        previousPrognosis: Prognosis.healthy,
        prognosis: Prognosis.healthyBuilding,
      }),
    ]
    const errors: FeedErrors = []

    render(<HookWrapper projects={projects} errors={errors} mute={true} />, {
      state,
    })

    expect(AudioPlayer.playAudio).not.toHaveBeenCalled()
  })

  it('should only play one notification at a time even if multiple projects transition to valid prognosis', () => {
    const state = {
      [prognosisSettingsRoot]: {
        [Prognosis.sick]: {
          systemNotification: false,
          sfx: 'sick-sfx.mp3',
          show: true,
        },
        [Prognosis.healthy]: {
          systemNotification: false,
          sfx: 'healthy-sfx.mp3',
          show: true,
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

    expect(AudioPlayer.playAudio).toHaveBeenCalledWith('sick-sfx.mp3', 1)
    expect(AudioPlayer.playAudio).not.toHaveBeenCalledWith('healthy-sfx.mp3', 1)
  })

  it('should not play more notifications if a previous notification is still playing', () => {
    jest.spyOn(AudioPlayer, 'anyAudioPlaying').mockReturnValueOnce(false)

    const state = {
      [prognosisSettingsRoot]: {
        [Prognosis.sick]: {
          systemNotification: false,
          sfx: 'sick-sfx.mp3',
          show: true,
        },
        [Prognosis.healthy]: {
          systemNotification: false,
          sfx: 'healthy-sfx.mp3',
          show: true,
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
      { state },
    )

    jest.spyOn(AudioPlayer, 'anyAudioPlaying').mockReturnValue(true)

    rerender(<HookWrapper projects={secondRender} errors={errors} />)

    expect(AudioPlayer.playAudio).toHaveBeenCalledWith('sick-sfx.mp3', 1)
    expect(AudioPlayer.playAudio).not.toHaveBeenCalledWith('healthy-sfx.mp3', 1)
  })

  it('should not play notifications when project is still in same prognosis', () => {
    const state = {
      [prognosisSettingsRoot]: {
        [Prognosis.sick]: {
          systemNotification: false,
          sfx: 'some-sfx.mp3',
          show: true,
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
      [prognosisSettingsRoot]: {
        [Prognosis.sick]: {
          systemNotification: false,
          sfx: 'sick-sfx.mp3',
          show: true,
        },
      },
      [personalSettingsRoot]: {
        allowAudioNotifications: true,
      },
    }
    const projectsFirstFetch = [
      buildProject({
        projectId: 'some-id',
        previousPrognosis: Prognosis.healthyBuilding,
        prognosis: Prognosis.sick,
      }),
    ]
    const projectsSecondFetch = [
      buildProject({
        projectId: 'some-id',
        previousPrognosis: Prognosis.sick,
        prognosis: Prognosis.sick,
      }),
    ]
    const errors: FeedErrors = []

    const { rerender } = render(
      <HookWrapper projects={projectsFirstFetch} errors={errors} />,
      { state },
    )
    rerender(<HookWrapper projects={projectsSecondFetch} errors={errors} />)

    expect(AudioPlayer.playAudio).toHaveBeenCalledTimes(1)
  })
})

describe('browser title', () => {
  it('should update the title with a summary', () => {
    const state = {
      [prognosisSettingsRoot]: {
        [Prognosis.sick]: { show: true },
        [Prognosis.sickBuilding]: { show: true },
        [Prognosis.healthyBuilding]: { show: true },
        [Prognosis.unknown]: { show: true },
        [Prognosis.healthy]: { show: true },
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
      '1 Error, 1 Sick, 1 Sick building, 1 Healthy building, 1 Unknown, 1 Healthy',
    )
  })

  it('should exclude prognoses that have no projects', () => {
    const state = {
      [prognosisSettingsRoot]: {
        [Prognosis.sick]: { show: true },
        [Prognosis.sickBuilding]: { show: true },
        [Prognosis.healthyBuilding]: { show: true },
        [Prognosis.unknown]: { show: true },
        [Prognosis.healthy]: { show: true },
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
      [prognosisSettingsRoot]: {
        [Prognosis.sick]: { show: true },
        [Prognosis.sickBuilding]: { show: true },
        [Prognosis.healthyBuilding]: { show: true },
        [Prognosis.unknown]: { show: true },
        [Prognosis.healthy]: { show: true },
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
})
