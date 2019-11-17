import {formatBuildLabel, isBuilding, isSick, Prognosis, wrapProjects} from '../../../src/client/domain/Project'
import {buildApiProject} from '../testHelpers'

describe('formatBuildLabel', () => {

  it('should return empty string for blank value', () => {
    expect(formatBuildLabel(' ')).toBe('')
  })

  it('should add a # to numbers', () => {
    expect(formatBuildLabel('1234')).toBe('#1234')
  })

  it('should trim the build label to given length', () => {
    expect(formatBuildLabel('abcdefghijklmnopqrstuvwxyz', 3)).toBe('abc')
  })

  it('should trim the build label to 10 characters by default', () => {
    expect(formatBuildLabel('abcdefghijklmnopqrstuvwxyz')).toBe('abcdefghij')
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
