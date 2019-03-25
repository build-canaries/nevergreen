import {ensureHasScheme, hasScheme, removeScheme} from '../../../src/client/domain/Url'

describe('Url', () => {

  describe('hasScheme', () => {

    test('should return true when there is a scheme', () => {
      expect(hasScheme('http://some-url')).toBe(true)
    })

    test('should return false when there is no scheme', () => {
      expect(hasScheme('some-thing')).toBe(false)
    })

    test('should handle null', () => {
      expect(hasScheme(null)).toBe(false)
    })
  })

  describe('removeScheme', () => {

    test('should remove the scheme', () => {
      expect(removeScheme('http://some-url')).toBe('//some-url')
    })

    test('should do nothing if there is no scheme', () => {
      expect(removeScheme('some-thing')).toBe('some-thing')
    })

    test('should handle null', () => {
      expect(removeScheme(null)).toBeNull()
    })
  })

  describe('ensureHasScheme', () => {

    test('should do nothing if the url already has a scheme', () => {
      expect(ensureHasScheme('ftp://some-url')).toBe('ftp://some-url')
    })

    test('should add the default scheme if it is missing', () => {
      expect(ensureHasScheme('some-url')).toBe('http://some-url')
    })

    test(
      'should add the default scheme if it is missing and the user added started slashes',
      () => {
        expect(ensureHasScheme('//some-url')).toBe('http://some-url')
      }
    )
  })
})
