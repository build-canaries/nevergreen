import {
  formatBuildLabel,
  isBuilding,
  isSick,
  PROGNOSIS_HEALTHY_BUILDING,
  PROGNOSIS_SICK,
  PROGNOSIS_SICK_BUILDING,
  PROGNOSIS_UNKNOWN
} from '../../../src/client/domain/Project'
import {forNonStrings, forUndisplayableStrings} from '../testHelpers'

describe('Project', () => {

  describe('formatBuildLabel', () => {

    forUndisplayableStrings((value, friendlyName) => {
      test(
        `should return empty string for undisplayable value ${friendlyName}`,
        () => {
          expect(formatBuildLabel(value)).toBe('')
        }
      )
    })

    forNonStrings((value, friendlyName) => {
      test(
        `should return empty string for invalid value ${friendlyName}`,
        () => {
          expect(formatBuildLabel(value)).toBe('')
        }
      )
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
      expect(isSick(PROGNOSIS_SICK)).toBe(true)
    })

    const otherPrognosis = [
      PROGNOSIS_UNKNOWN,
      PROGNOSIS_HEALTHY_BUILDING,
      PROGNOSIS_SICK_BUILDING
    ]

    otherPrognosis.forEach((value) => {
      test(`should be false for value ${value}`, () => {
        expect(isSick(value)).toBe(false)
      })
    })

    forUndisplayableStrings((value, friendlyName) => {
      test(`should be false for invalid value ${friendlyName}`, () => {
        expect(isSick(value)).toBe(false)
      })
    })

    forNonStrings((value, friendlyName) => {
      test(`should be false for invalid value ${friendlyName}`, () => {
        expect(isSick(value)).toBe(false)
      })
    })
  })

  describe('isBuilding', () => {

    test('should be true when healthy building', () => {
      expect(isBuilding(PROGNOSIS_HEALTHY_BUILDING)).toBe(true)
    })

    test('should be true when sick building', () => {
      expect(isBuilding(PROGNOSIS_SICK_BUILDING)).toBe(true)
    })

    const otherPrognosis = [
      PROGNOSIS_UNKNOWN,
      PROGNOSIS_SICK
    ]

    otherPrognosis.forEach((value) => {
      test(`should be false for value ${value}`, () => {
        expect(isBuilding(value)).toBe(false)
      })
    })

    forUndisplayableStrings((value, friendlyName) => {
      test(`should be false for invalid value ${friendlyName}`, () => {
        expect(isSick(value)).toBe(false)
      })
    })

    forNonStrings((value, friendlyName) => {
      test(`should be false for invalid value ${friendlyName}`, () => {
        expect(isSick(value)).toBe(false)
      })
    })
  })
})
