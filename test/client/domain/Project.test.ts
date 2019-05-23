import {formatBuildLabel, isBuilding, isSick, Prognosis} from '../../../src/client/domain/Project'

describe('Project', () => {

  describe('formatBuildLabel', () => {

    test('should return empty string for blank value', () => {
      expect(formatBuildLabel(' ')).toBe('')
    })

    test('should add a # to numbers', () => {
      expect(formatBuildLabel('1234')).toBe('#1234')
    })

    test('should trim the build label to given length', () => {
      expect(formatBuildLabel('abcdefghijklmnopqrstuvwxyz', 3)).toBe('abc')
    })

    test('should trim the build label to 10 characters by default', () => {
      expect(formatBuildLabel('abcdefghijklmnopqrstuvwxyz')).toBe('abcdefghij')
    })
  })

  describe('isSick', () => {

    test('should be true when sick', () => {
      expect(isSick(Prognosis.sick)).toBe(true)
    })

    const otherPrognosis = [
      Prognosis.unknown,
      Prognosis.healthyBuilding,
      Prognosis.sickBuilding
    ]

    otherPrognosis.forEach((value) => {
      test(`should be false for value ${value}`, () => {
        expect(isSick(value)).toBe(false)
      })
    })
  })

  describe('isBuilding', () => {

    test('should be true when healthy building', () => {
      expect(isBuilding(Prognosis.healthyBuilding)).toBe(true)
    })

    test('should be true when sick building', () => {
      expect(isBuilding(Prognosis.sickBuilding)).toBe(true)
    })

    const otherPrognosis = [
      Prognosis.unknown,
      Prognosis.sick
    ]

    otherPrognosis.forEach((value) => {
      test(`should be false for value ${value}`, () => {
        expect(isBuilding(value)).toBe(false)
      })
    })
  })
})
