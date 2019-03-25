import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as Logger from '../../src/client/common/Logger'

// Configure Enzyme to use the React 16 adapter
Enzyme.configure({adapter: new Adapter()})

// Disable all logging for tests as it just adds noise to the console
Logger.error = jest.fn()
Logger.warn = jest.fn()
Logger.info = jest.fn()
Logger.debug = jest.fn()
