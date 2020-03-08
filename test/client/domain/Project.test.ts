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
    const result = wrapProjects([buildApiProject({isError: true})])
    expect(result).toEqual([])
  })

  it('should filter jobs', () => {
    const result = wrapProjects([buildApiProject({job: 'some-job'})])
    expect(result).toEqual([])
  })

  it('should copy whether the project is new or not', () => {
    const result = wrapProjects([buildApiProject({isNew: true})])
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({isNew: true})]))
  })
})
