import {isBuilding, isSick, Prognosis, projectBuildLabel, wrapProjects} from '../../../src/client/domain/Project'
import {buildApiError, buildApiProject, buildProject} from '../testHelpers'

describe('isSick', () => {

  it('should be true when sick', () => {
    expect(isSick(buildProject({prognosis: Prognosis.sick}))).toBe(true)
  })

  it.each([
    Prognosis.unknown,
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding
  ])('should be false for value %s', (prognosis) => {
    expect(isSick(buildProject({prognosis}))).toBe(false)
  })
})

describe('isBuilding', () => {

  it('should be true when healthy building', () => {
    expect(isBuilding(buildProject({prognosis: Prognosis.healthyBuilding}))).toBe(true)
  })

  it('should be true when sick building', () => {
    expect(isBuilding(buildProject({prognosis: Prognosis.sickBuilding}))).toBe(true)
  })

  it.each([
    Prognosis.unknown,
    Prognosis.sick
  ])('should be false for value %s', (prognosis) => {
    expect(isBuilding(buildProject({prognosis}))).toBe(false)
  })
})

describe('projectBuildLabel', () => {

  it.each([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding
  ])('should return an empty string if the project is %s because the label is only updated AFTER the project has finished building', (prognosis) => {
    const project = buildProject({prognosis, lastBuildLabel: 'some-label'})
    expect(projectBuildLabel(project)).toBe('')
  })

  it.each([
    Prognosis.sick,
    Prognosis.unknown,
    Prognosis.healthy
  ])('should return the last build label if the project is %s', (prognosis) => {
    const project = buildProject({prognosis, lastBuildLabel: 'some-label'})
    expect(projectBuildLabel(project)).toBe('some-label')
  })

  it.each([
    Prognosis.sick,
    Prognosis.unknown,
    Prognosis.healthy
  ])('should add a # to the last build label if the project is %s and the label is numeric', (prognosis) => {
    const project = buildProject({prognosis, lastBuildLabel: '1234'})
    expect(projectBuildLabel(project)).toBe('#1234')
  })
})

describe('wrapProjects', () => {

  it('should remove errors', () => {
    const fetched = [buildApiError()]
    const result = wrapProjects(fetched, [])
    expect(result).toEqual([])
  })

  it('should copy whether the project is new or not', () => {
    const fetched = [
      buildApiProject({projectId: '1', isNew: false}),
      buildApiProject({projectId: '2', isNew: true})
    ]
    const result = wrapProjects(fetched, [])
    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({projectId: '1', isNew: false}),
      expect.objectContaining({projectId: '2', isNew: true})
    ]))
  })

  it.each([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding
  ])('should add how long a %s project has been building', (prognosis) => {
    const fetched = [buildApiProject({prognosis, timestamp: 'fetched-time'})]
    const result = wrapProjects(fetched, [])
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({timestamp: 'fetched-time'})]))
  })

  it.each([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding
  ])('should calculate how long a %s project has been building across multiple fetches', (prognosis) => {
    const fetched = [buildApiProject({
      projectId: 'some-id',
      prognosis,
      lastBuildLabel: '1',
      timestamp: 'updated-fetched-time'
    })]
    const previous = [buildProject({
      projectId: 'some-id',
      prognosis,
      lastBuildLabel: '1',
      timestamp: 'original-fetched-time'
    })]
    const result = wrapProjects(fetched, previous)
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({timestamp: 'original-fetched-time'})]))
  })

  it.each([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding
  ])('should reset how long a %s project has been building if a new build was triggered between polling intervals', (prognosis) => {
    const fetched = [buildApiProject({
      projectId: 'some-id',
      prognosis,
      lastBuildLabel: '2',
      timestamp: 'updated-fetched-time'
    })]
    const previous = [buildProject({
      projectId: 'some-id',
      prognosis,
      lastBuildLabel: '1',
      timestamp: 'original-fetched-time'
    })]
    const result = wrapProjects(fetched, previous)
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({timestamp: 'updated-fetched-time'})]))
  })
})
