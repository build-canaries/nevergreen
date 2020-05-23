import {errorMessage, isBlank, isNumeric} from '../../../src/client/common/Utils'

describe('isNumber', () => {

  it('should know when it sees a number', () => {
    expect(isNumeric(0)).toBe(true)
  })

  it('should treat a numeric string as a number', () => {
    expect(isNumeric('1')).toBe(true)
  })

  it('should know null is not a number', () => {
    expect(isNumeric(null)).toBe(false)
  })

  it('should know undefined is not a number', () => {
    expect(isNumeric(undefined)).toBe(false)
  })

  it('should know a blank string is not a number', () => {
    expect(isNumeric(' ')).toBe(false)
  })
})

describe('isBlank', () => {

  it('should treat null as blank', () => {
    expect(isBlank(null)).toBe(true)
  })

  it('should treat undefined as blank', () => {
    expect(isBlank(undefined)).toBe(true)
  })

  it('should treat an empty string as blank', () => {
    expect(isBlank('')).toBe(true)
  })

  it('should treat a whitespace only string as blank', () => {
    expect(isBlank('   ')).toBe(true)
  })

  it('should not treat a string with non whitespace characters as blank', () => {
    expect(isBlank('test')).toBe(false)
  })

  it('should not treat a string with mixed characters as blank', () => {
    expect(isBlank(' t e s t ')).toBe(false)
  })

  it('should treat a number as blank', () => {
    expect(isBlank(1)).toBe(true)
  })

  it('should treat an object as blank', () => {
    expect(isBlank({})).toBe(true)
  })

  it('should treat an array as blank', () => {
    expect(isBlank([])).toBe(true)
  })

  it('should treat a boolean as blank', () => {
    expect(isBlank(true)).toBe(true)
  })
})

describe('errorMessage', () => {

  it.each([
    null, undefined, 'string', 1, {}
  ])('should return generic message for %s', (val) => {
    expect(errorMessage(val)).toBe('Unknown error')
  })

  it('should return the message for objects that have one', () => {
    expect(errorMessage({message: 'some-message'})).toBe('some-message')
  })

  it('should return the message for Errors', () => {
    expect(errorMessage(new Error('some-message'))).toBe('some-message')
  })
})
