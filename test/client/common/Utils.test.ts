import {isBlank, isNumber} from '../../../src/client/common/Utils'

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

    test('should not treat a string with non whitespace characters as blank', () => {
      expect(isBlank('test')).toBe(false)
    })

    test('should not treat a string with mixed characters as blank', () => {
      expect(isBlank(' t e s t ')).toBe(false)
    })

    test('should treat a number as blank', () => {
      expect(isBlank(1)).toBe(true)
    })

    test('should treat an object as blank', () => {
      expect(isBlank({})).toBe(true)
    })

    test('should treat an array as blank', () => {
      expect(isBlank([])).toBe(true)
    })

    test('should treat a boolean as blank', () => {
      expect(isBlank(true)).toBe(true)
    })
  })
})
