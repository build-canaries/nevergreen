import React from 'react'
import {shallow} from 'enzyme'
import {Locally} from '../../../../../src/client/backup/import/locally/Locally'
import {changeAndBlur, locator} from '../../../testHelpers'
import {noop} from 'lodash'

describe('import <Locally/>', () => {

  const DEFAULT_PROPS = {
    setConfiguration: noop
  }

  test('should import valid data after filtering and parsing', async () => {
    const setConfiguration = jest.fn()
    const props = {...DEFAULT_PROPS, setConfiguration}

    const wrapper = shallow(<Locally {...props} />)
    changeAndBlur(wrapper.find(locator('import-data')), '{}')
    await wrapper.find(locator('import')).simulate('click')

    expect(wrapper.find(locator('messages')).prop('messages')).toContain('Successfully imported configuration')
    expect(setConfiguration).toHaveBeenCalledWith({})
  })

  test('should show an error if no data has been entered', async () => {
    const setConfiguration = jest.fn()
    const props = {...DEFAULT_PROPS, setConfiguration}

    const wrapper = shallow(<Locally {...props} />)
    await wrapper.find(locator('import')).simulate('click')

    expect(wrapper.find(locator('messages')).prop('messages')).toContain('Please enter the configuration to import')
    expect(setConfiguration).not.toHaveBeenCalled()
  })

  test('should show an error if the data is syntactically invalid (bad json)', async () => {
    const setConfiguration = jest.fn()
    const props = {...DEFAULT_PROPS, setConfiguration}

    const wrapper = shallow(<Locally {...props} />)
    changeAndBlur(wrapper.find(locator('import-data')), '{')
    await wrapper.find(locator('import')).simulate('click')

    expect(wrapper.find(locator('messages')).prop('messages')).toContain('Unexpected end of JSON input')
    expect(setConfiguration).not.toHaveBeenCalled()
  })

  test('should show an error if the data is semantically invalid (missing required attributes)', async () => {
    const setConfiguration = jest.fn()
    const props = {...DEFAULT_PROPS, setConfiguration}

    const wrapper = shallow(<Locally {...props} />)
    changeAndBlur(wrapper.find(locator('import-data')), '{"trays":{"some-id":{}}}')
    await wrapper.find(locator('import')).simulate('click')

    expect(wrapper.find(locator('messages')).prop('messages')).toContain('.trays[\'some-id\'] should have required property \'trayId\'')
    expect(setConfiguration).not.toHaveBeenCalled()
  })
})
