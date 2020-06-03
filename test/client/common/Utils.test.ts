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

  it.each`
    val          | what
    ${null}      | ${'null'}
    ${undefined} | ${'undefined'}
    ${''}        | ${'a string'}
    ${1}         | ${'a number'}
    ${{}}        | ${'an object with a message key'}
  `('should return a generic message for $what', ({val}) => {
    expect(errorMessage(val)).toBe('Unknown error')
  })

  it('should return the message for objects that have one', () => {
    expect(errorMessage({message: 'some-message'})).toBe('some-message')
  })

  it('should return a generic message for objects that have a message key that is not a string', () => {
    expect(errorMessage({message: 1})).toBe('Unknown error')
  })

  it('should return the message for Errors', () => {
    expect(errorMessage(new Error('some-message'))).toBe('some-message')
  })

  it('should reword the "Request has been terminated ..." Error as it is overly verbose and includes causes that are not likely', () => {
    const message = 'Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.'
    expect(errorMessage(new Error(message))).toBe('The network is offline or the Nevergreen server is not running')
  })
})
