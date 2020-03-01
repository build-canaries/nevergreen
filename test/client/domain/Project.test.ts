import {
  formatBuildLabel,
  isBuilding,
  isSick,
  Prognosis,
  projectDescription,
  wrapProjects
} from '../../../src/client/domain/Project'
import {buildApiProject, buildProject} from '../testHelpers'

describe('formatBuildLabel', () => {

  it('should return empty string for blank value', () => {
    expect(formatBuildLabel(' ')).toBe('')
  })

  it('should add a # to numbers', () => {
    expect(formatBuildLabel('1234')).toBe('#1234')
  })
})

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
    expect(isSick(Prognosis.sick)).toBe(true)
  })

  const otherPrognosis = [
    Prognosis.unknown,
    Prognosis.healthyBuilding,
    Prognosis.sickBuilding
  ]

  otherPrognosis.forEach((value) => {
    it(`should be false for value ${value}`, () => {
      expect(isSick(value)).toBe(false)
    })
  })
})

describe('isBuilding', () => {

  it('should be true when healthy building', () => {
    expect(isBuilding(Prognosis.healthyBuilding)).toBe(true)
  })

  it('should be true when sick building', () => {
    expect(isBuilding(Prognosis.sickBuilding)).toBe(true)
  })

  const otherPrognosis = [
    Prognosis.unknown,
    Prognosis.sick
  ]

  otherPrognosis.forEach((value) => {
    it(`should be false for value ${value}`, () => {
      expect(isBuilding(value)).toBe(false)
    })
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
