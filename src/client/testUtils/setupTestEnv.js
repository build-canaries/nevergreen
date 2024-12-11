import 'core-js/stable'
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom'
import { act, configure } from '@testing-library/react'
import noop from 'lodash/noop'

configure({ testIdAttribute: 'data-locator' })

// Disable all logging for tests as it just adds noise to the console
jest.mock('../../../src/client/common/Logger')

window.scrollTo = noop
window.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

afterEach(async () => {
  // This has to be awaited otherwise tests don't clean up properly and cause failures
  // eslint-disable-next-line @typescript-eslint/await-thenable,@typescript-eslint/no-confusing-void-expression
  await act(() => {
    jest.runAllTimers()
  })
})
