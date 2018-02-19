import proxyquire from 'proxyquire'

proxyquire.noCallThru()

export function withMockedImports(fileFromSrcDir, imports) {
  return proxyquire(`../../src/${fileFromSrcDir}`, imports)
}

export function locator(name) {
  return `[data-locator="${name}"]`
}
