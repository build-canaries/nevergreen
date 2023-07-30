import {
  enrichProjects,
  isProject,
  Prognosis,
  projectBuildLabel,
  projectIdentifier,
  ProjectPrognosis,
} from './Project'
import { buildFeedError, buildProject } from '../testUtils/builders'

describe('isProject', () => {
  it('should be false when error', () => {
    expect(isProject(buildFeedError())).toBe(false)
  })

  it.each<ProjectPrognosis>([
    Prognosis.unknown,
    Prognosis.healthy,
    Prognosis.healthyBuilding,
    Prognosis.sick,
    Prognosis.sickBuilding,
  ])('should be true for value %s', (prognosis) => {
    expect(isProject(buildProject({ prognosis }))).toBe(true)
  })
})

describe('projectIdentifier', () => {
  it('should return the web URL as the identifier for errors as they do not have project Ids', () => {
    const project = buildFeedError({ webUrl: 'some-url' })
    expect(projectIdentifier(project)).toBe('some-url')
  })

  it('should return the feed and project Ids as the identifier for projects as multiple feeds could have the same projects', () => {
    const project = buildProject({
      trayId: 'some-tray-id',
      projectId: 'some-project-id',
    })
    expect(projectIdentifier(project)).toBe('some-tray-id#some-project-id')
  })
})

describe('projectBuildLabel', () => {
  it.each<ProjectPrognosis>([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding,
  ])(
    'should return an empty string if the project is %s because the label is only updated AFTER the project has finished building',
    (prognosis) => {
      const project = buildProject({ prognosis, lastBuildLabel: 'some-label' })
      expect(projectBuildLabel(project)).toBe('')
    },
  )

  it.each<ProjectPrognosis>([
    Prognosis.sick,
    Prognosis.unknown,
    Prognosis.healthy,
  ])('should return the last build label if the project is %s', (prognosis) => {
    const project = buildProject({ prognosis, lastBuildLabel: 'some-label' })
    expect(projectBuildLabel(project)).toBe('some-label')
  })

  it.each<ProjectPrognosis>([
    Prognosis.sick,
    Prognosis.unknown,
    Prognosis.healthy,
  ])(
    'should add a # to the last build label if the project is %s and the label is numeric',
    (prognosis) => {
      const project = buildProject({ prognosis, lastBuildLabel: '1234' })
      expect(projectBuildLabel(project)).toBe('#1234')
    },
  )
})

describe('enrichProjects', () => {
  it.each<ProjectPrognosis>([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding,
  ])('should add how long a %s project has been building', (prognosis) => {
    const fetched = [buildProject({ prognosis, timestamp: 'fetched-time' })]
    const result = enrichProjects(fetched, [])
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ timestamp: 'fetched-time' }),
      ]),
    )
  })

  it.each<ProjectPrognosis>([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding,
  ])(
    'should calculate how long a %s project has been building across multiple fetches',
    (prognosis) => {
      const fetched = [
        buildProject({
          projectId: 'some-id',
          prognosis,
          lastBuildLabel: '1',
          timestamp: 'updated-fetched-time',
        }),
      ]
      const previous = [
        buildProject({
          projectId: 'some-id',
          prognosis,
          lastBuildLabel: '1',
          timestamp: 'original-fetched-time',
        }),
      ]
      const result = enrichProjects(fetched, previous)
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ timestamp: 'original-fetched-time' }),
        ]),
      )
    },
  )

  it.each<ProjectPrognosis>([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding,
  ])(
    'should reset how long a %s project has been building if a new build was triggered between polling intervals',
    (prognosis) => {
      const fetched = [
        buildProject({
          projectId: 'some-id',
          prognosis,
          lastBuildLabel: '2',
          timestamp: 'updated-fetched-time',
        }),
      ]
      const previous = [
        buildProject({
          projectId: 'some-id',
          prognosis,
          lastBuildLabel: '1',
          timestamp: 'original-fetched-time',
        }),
      ]
      const result = enrichProjects(fetched, previous)
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ timestamp: 'updated-fetched-time' }),
        ]),
      )
    },
  )

  it('should add the previous prognosis if the project was previously fetched', () => {
    const fetched = [
      buildProject({
        projectId: 'some-id',
        prognosis: Prognosis.sickBuilding,
      }),
    ]
    const previous = [
      buildProject({
        projectId: 'some-id',
        prognosis: Prognosis.sick,
      }),
    ]
    const result = enrichProjects(fetched, previous)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ previousPrognosis: Prognosis.sick }),
      ]),
    )
  })

  it('should not confused projects from different feeds with the same project id', () => {
    const fetched = [
      buildProject({
        projectId: 'some-id',
        prognosis: Prognosis.sickBuilding,
        trayId: 'feed-1',
      }),
    ]
    const previous = [
      buildProject({
        projectId: 'some-id',
        prognosis: Prognosis.sick,
        trayId: 'feed-2',
      }),
    ]
    const result = enrichProjects(fetched, previous)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ previousPrognosis: undefined }),
      ]),
    )
  })
})
