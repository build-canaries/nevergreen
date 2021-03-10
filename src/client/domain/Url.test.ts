import {ensureHasScheme, isValidHttpUrl, removeScheme} from './Url'

describe('removeScheme', () => {

  it('should remove the scheme', () => {
    expect(removeScheme('http://some-url/')).toBe('//some-url/')
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

describe('isValidHttpUrl', () => {

  it('should return true if the URL has a http scheme', () => {
    expect(isValidHttpUrl('http://example.com')).toBe(true)
  })

  it('should return true if the URL has a https scheme', () => {
    expect(isValidHttpUrl('https://example.com')).toBe(true)
  })

  it('should return false otherwise', () => {
    expect(isValidHttpUrl('file://example')).toBe(false)
  })
})
