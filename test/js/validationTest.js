jest.dontMock('../../src/js/validation')
  .dontMock('validate.js')

describe('validation', () => {

  let validation, validate

  beforeEach(() => {
    validation = require('../../src/js/validation')
    validate = require('validate.js')
  })

  describe('object matcher', () => {
    const expectedMessage = 'must be an object'

    it('returns no error message for objects', () => {
      expect(validation._object({})).toBeUndefined()
    })

    it('returns an error message for strings', () => {
      expect(validation._object('some-string')).toBe(expectedMessage)
    })

    it('returns an error message for numbers', () => {
      expect(validation._object(1)).toBe(expectedMessage)
    })

    it('returns an error message for arrays', () => {
      expect(validation._object([])).toBe(expectedMessage)
    })
  })

  describe('array matcher', () => {
    const expectedMessage = 'must be an array'

    it('returns no error message for arrays', () => {
      expect(validation._array([])).toBeUndefined()
    })

    it('allows elements to be validated', () => {
      const alwaysValid = () => {
        return true
      }
      expect(validation._array([], {elementValidation: alwaysValid})).toBeUndefined()
    })

    it('returns an error message if an element is invalid', () => {
      const alwaysInvalid = () => {
        return false
      }
      expect(validation._array(['a'], {elementValidation: alwaysInvalid})).toBe('has an invalid value at index 0')
    })

    it('returns an error message if multiple elements are invalid', () => {
      const alwaysInvalid = () => {
        return false
      }
      expect(validation._array(['a'], {elementValidation: alwaysInvalid})).toBe('has an invalid value at index 0')
    })

    it('return an error message for objects', () => {
      expect(validation._array({})).toBe(expectedMessage)
    })

    it('return an error message for numbers', () => {
      expect(validation._array(2)).toBe(expectedMessage)
    })

    it('return an error message for strings', () => {
      expect(validation._array('')).toBe(expectedMessage)
    })
  })

  describe('wires up validate.js correctly', () => {
    beforeEach(() => {
      validation.init()
    })

    it('registers the object matcher', () => {
      expect(validate.validators.object).toBeTruthy()
    })

    it('registers the array matcher', () => {
      expect(validate.validators.array).toBeTruthy()
    })

    it('allows the element validation function to be passed to the array matcher', () => {
      const alwaysInvalid = () => {
        return false
      }
      expect(validate({test: ['a']}, {test: {array: {elementValidation: alwaysInvalid}}})).toBeTruthy()
    })
  })

  describe('array element validation', () => {
    it('returns true for a string', () => {
      expect(validation.nonEmptyStrings('some-string')).toBeTruthy()
    })

    it('returns false for empty string', () => {
      expect(validation.nonEmptyStrings('')).toBeFalsy()
    })

    it('returns false for object', () => {
      expect(validation.nonEmptyStrings({})).toBeFalsy()
    })

    it('returns false for arrays', () => {
      expect(validation.nonEmptyStrings([])).toBeFalsy()
    })

    it('returns false for numbers', () => {
      expect(validation.nonEmptyStrings(1)).toBeFalsy()
    })
  })
})
