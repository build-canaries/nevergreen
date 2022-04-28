import 'core-js/stable'
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect'
import {configure} from '@testing-library/react'
import noop from 'lodash/noop'
import {setLogger} from 'react-query'

configure({testIdAttribute: 'data-locator'})

// Disable all logging for tests as it just adds noise to the console
jest.mock('../../src/client/common/Logger')

window.scrollTo = noop

setLogger({
  log: console.log,
  warn: console.warn,
  error: noop
})
