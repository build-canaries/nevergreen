import proxyquire from 'proxyquire'

proxyquire.noCallThru()
export {proxyquire}

export function locator(name) {
  return `[data-locator="${name}"]`
}
