import {
  isBuilding,
  isError,
  isSick,
  Prognosis,
  projectBuildLabel,
  projectIdentifier,
  ProjectPrognosis,
  toProjectError,
  updateProjects
} from './Project'
import {buildProject, buildProjectError} from '../testHelpers'
import * as DateTime from '../common/DateTime'

describe('toProjectError', () => {

  it('should set the prognosis to error', () => {
    expect(toProjectError(new Error())).toHaveProperty('prognosis', Prognosis.error)
  })

  it('should set the timestamp to now', () => {
    jest.spyOn(DateTime, 'now').mockReturnValue('now')
    expect(toProjectError(new Error())).toHaveProperty('timestamp', 'now')
  })

  it('should set the exception message as description', () => {
    expect(toProjectError(new Error('some-error'))).toHaveProperty('description', 'some-error')
  })
})

describe('isError', () => {

  it('should be true when error', () => {
    expect(isError(buildProjectError())).toBe(true)
  })

  it.each<ProjectPrognosis>([
    Prognosis.unknown,
    Prognosis.healthy,
    Prognosis.healthyBuilding,
    Prognosis.sick,
    Prognosis.sickBuilding
  ])('should be false for value %s', (prognosis) => {
    expect(isError(buildProject({prognosis}))).toBe(false)
  })
})

describe('isSick', () => {

  it('should be true when sick', () => {
    expect(isSick(buildProject({prognosis: Prognosis.sick}))).toBe(true)
  })

  it.each<ProjectPrognosis>([
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

  it.each<ProjectPrognosis>([
    Prognosis.unknown,
    Prognosis.sick
  ])('should be false for value %s', (prognosis) => {
    expect(isBuilding(buildProject({prognosis}))).toBe(false)
  })
})

describe('projectIdentifier', () => {

  it('should return anc identifier for errors', () => {
    const project = buildProjectError({webUrl: 'some-url'})
    expect(projectIdentifier(project)).toBe('some-url')
  })

  it('should return an identifier for projects', () => {
    const project = buildProject({trayId: 'some-tray-id', projectId: 'some-project-id'})
    expect(projectIdentifier(project)).toBe('some-tray-id#some-project-id')
  })
})

describe('projectBuildLabel', () => {

  it.each<ProjectPrognosis>([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding
  ])('should return an empty string if the project is %s because the label is only updated AFTER the project has finished building', (prognosis) => {
    const project = buildProject({prognosis, lastBuildLabel: 'some-label'})
    expect(projectBuildLabel(project)).toBe('')
  })

  it.each<ProjectPrognosis>([
    Prognosis.sick,
    Prognosis.unknown,
    Prognosis.healthy
  ])('should return the last build label if the project is %s', (prognosis) => {
    const project = buildProject({prognosis, lastBuildLabel: 'some-label'})
    expect(projectBuildLabel(project)).toBe('some-label')
  })

  it.each<ProjectPrognosis>([
    Prognosis.sick,
    Prognosis.unknown,
    Prognosis.healthy
  ])('should add a # to the last build label if the project is %s and the label is numeric', (prognosis) => {
    const project = buildProject({prognosis, lastBuildLabel: '1234'})
    expect(projectBuildLabel(project)).toBe('#1234')
  })
})

describe('updateProjects', () => {

  it('should add how long a tray has been in error', () => {
    const fetched = [buildProjectError({
      timestamp: 'updated-fetched-time',
      webUrl: 'some-url'
    })]
    const previous = [buildProjectError({
      timestamp: 'original-fetched-time',
      webUrl: 'some-url'
    })]
    const result = updateProjects(fetched, previous)
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({timestamp: 'original-fetched-time'})]))
  })

  it.each<ProjectPrognosis>([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding
  ])('should add how long a %s project has been building', (prognosis) => {
    const fetched = [buildProject({prognosis, timestamp: 'fetched-time'})]
    const result = updateProjects(fetched, [])
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({timestamp: 'fetched-time'})]))
  })

  it.each<ProjectPrognosis>([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding
  ])('should calculate how long a %s project has been building across multiple fetches', (prognosis) => {
    const fetched = [buildProject({
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
    const result = updateProjects(fetched, previous)
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({timestamp: 'original-fetched-time'})]))
  })

  it.each<ProjectPrognosis>([
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding
  ])('should reset how long a %s project has been building if a new build was triggered between polling intervals', (prognosis) => {
    const fetched = [buildProject({
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
    const result = updateProjects(fetched, previous)
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({timestamp: 'updated-fetched-time'})]))
  })
})
