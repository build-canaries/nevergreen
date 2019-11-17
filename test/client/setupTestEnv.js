import 'core-js/stable'
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect'
import {configure} from '@testing-library/react'
import * as Logger from '../../src/client/common/Logger'

configure({testIdAttribute: 'data-locator'})

// Disable all logging for tests as it just adds noise to the console
Logger.error = jest.fn()
Logger.warn = jest.fn()
Logger.info = jest.fn()
Logger.debug = jest.fn()
