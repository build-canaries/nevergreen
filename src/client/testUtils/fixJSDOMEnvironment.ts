import JSDOMEnvironment from 'jest-environment-jsdom'

// https://github.com/jsdom/jsdom/issues/1724#issuecomment-1446858041
export default class FixJSDOMEnvironment extends JSDOMEnvironment {
  constructor(...args: ConstructorParameters<typeof JSDOMEnvironment>) {
    super(...args)
    this.global.fetch = fetch
    this.global.Headers = Headers
    this.global.Request = Request
    this.global.Response = Response
  }
}
