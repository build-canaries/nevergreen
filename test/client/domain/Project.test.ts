import {
  isBuilding,
  isSick,
  Prognosis,
  projectBuildLabel,
  projectDescription,
  projectTimestamp,
  wrapProjects
} from '../../../src/client/domain/Project'
import {buildApiProject, buildProject} from '../testHelpers'

describe('projectDescription', () => {

  it('should return the name if stage is blank', () => {
    expect(projectDescription(buildProject({name: 'some-name', stage: ''}))).toBe('some-name')
  })

  it('should include the stage if it is not blank', () => {
    expect(projectDescription(buildProject({name: 'some-name', stage: 'some-stage'}))).toBe('some-name some-stage')
  })
})

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

describe('projectTimestamp', () => {

  it.each([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding
  ])('should return the building time if the project is %s', (prognosis) => {
    const project = buildProject({
      prognosis,
      thisBuildTime: 'build-time',
      lastBuildTime: 'last-build'
    })
    expect(projectTimestamp(project)).toBe('build-time')
  })

  it.each([
    Prognosis.sick,
    Prognosis.unknown,
    Prognosis.healthy
  ])('should return the last fetched time if the project is %s', (prognosis) => {
    const project = buildProject({
      prognosis,
      thisBuildTime: 'build-time',
      lastBuildTime: 'last-build'
    })
    expect(projectTimestamp(project)).toBe('last-build')
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
    const apiProjects = [buildApiProject({isError: true})]
    const result = wrapProjects(apiProjects, [])
    expect(result).toEqual([])
  })

  it('should filter jobs as these are GoCD specific and add a lot of noise to the Monitor page', () => {
    const apiProjects = [buildApiProject({job: 'some-job'})]
    const result = wrapProjects(apiProjects, [])
    expect(result).toEqual([])
  })

  it('should copy whether the project is new or not', () => {
    const apiProjects = [buildApiProject({isNew: true})]
    const result = wrapProjects(apiProjects, [])
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({isNew: true})]))
  })

  it.each([
    Prognosis.healthy,
    Prognosis.sick,
    Prognosis.unknown
  ])('should not include how long a %s project has been building', (prognosis) => {
    const apiProjects = [buildApiProject({prognosis, fetchedTime: 'fetched-time'})]
    const result = wrapProjects(apiProjects, [])
    expect(result).toEqual(expect.arrayContaining([expect.not.objectContaining({thisBuildTime: expect.any(String)})]))
  })

  it.each([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding
  ])('should add how long a %s project has been building', (prognosis) => {
    const apiProjects = [buildApiProject({prognosis, fetchedTime: 'fetched-time'})]
    const result = wrapProjects(apiProjects, [])
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({thisBuildTime: 'fetched-time'})]))
  })

  it.each([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding
  ])('should calculate how long a %s project has been building across multiple fetches', (prognosis) => {
    const apiProjects = [buildApiProject({projectId: 'some-id', prognosis, fetchedTime: 'updated-fetched-time'})]
    const previous = [buildProject({projectId: 'some-id', prognosis, thisBuildTime: 'original-fetched-time'})]
    const result = wrapProjects(apiProjects, previous)
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({thisBuildTime: 'original-fetched-time'})]))
  })

  it.each([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding
  ])('should reset how long a %s project has been building if a new build was triggered between polling intervals', (prognosis) => {
    const apiProjects = [buildApiProject({
      projectId: 'some-id',
      prognosis,
      lastBuildLabel: '2',
      fetchedTime: 'updated-fetched-time'
    })]
    const previous = [buildProject({
      projectId: 'some-id',
      prognosis,
      lastBuildLabel: '1',
      thisBuildTime: 'original-fetched-time'
    })]
    const result = wrapProjects(apiProjects, previous)
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({thisBuildTime: 'updated-fetched-time'})]))
  })
})
