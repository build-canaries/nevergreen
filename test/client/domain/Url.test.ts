import {ensureHasScheme, hasScheme, removeScheme} from '../../../src/client/domain/Url'

describe('hasScheme', () => {

  it('should return true when there is a scheme', () => {
    expect(hasScheme('http://some-url')).toBe(true)
  })

  it('should return false when there is no scheme', () => {
    expect(hasScheme('some-thing')).toBe(false)
  })
})

describe('removeScheme', () => {

  it('should remove the scheme', () => {
    expect(removeScheme('http://some-url')).toBe('//some-url')
  })

  it('should do nothing if there is no scheme', () => {
    expect(removeScheme('some-thing')).toBe('some-thing')
  })
})

describe('ensureHasScheme', () => {

  it('should do nothing if the url already has a scheme', () => {
    expect(ensureHasScheme('ftp://some-url')).toBe('ftp://some-url')
  })

  it('should add the default scheme if it is missing', () => {
    expect(ensureHasScheme('some-url')).toBe('http://some-url')
  })

  it('should add the default scheme if it is missing and the user added started slashes', () => {
    expect(ensureHasScheme('//some-url')).toBe('http://some-url')
  })
})
