import {isBlank, isNumber} from '../../../src/client/common/Utils'
import {forNonStrings} from '../testHelpers'

describe('Utils', () => {

  describe('isNumber', () => {

    test('should know when it sees a number', () => {
      expect(isNumber(0)).toBe(true)
    })

    test('should treat a numeric string as a number', () => {
      expect(isNumber('1')).toBe(true)
    })

    test('should know null is not a number', () => {
      expect(isNumber(null)).toBe(false)
    })

    test('should know undefined is not a number', () => {
      expect(isNumber(undefined)).toBe(false)
    })

    test('should know a blank string is not a number', () => {
      expect(isNumber(' ')).toBe(false)
    })
  })

  describe('isBlank', () => {

    test('should treat null as blank', () => {
      expect(isBlank(null)).toBe(true)
    })

    test('should treat undefined as blank', () => {
      expect(isBlank(undefined)).toBe(true)
    })

    test('should treat an empty string as blank', () => {
      expect(isBlank('')).toBe(true)
    })

    test('should treat a whitespace only string as blank', () => {
      expect(isBlank('   ')).toBe(true)
    })

    test(
      'should not treat a string with non whitespace characters as blank',
      () => {
        expect(isBlank('test')).toBe(false)
      }
    )

    test('should not treat a string with mixed characters as blank', () => {
      expect(isBlank(' t e s t ')).toBe(false)
    })

    forNonStrings((val, friendlyName) => {
      test(`should treat non string value ${friendlyName} as blank`, () => {
        expect(isBlank(val)).toBe(true)
      })
    })
  })
})
