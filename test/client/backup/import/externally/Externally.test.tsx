import React from 'react'
import {shallow} from 'enzyme'
import {Externally} from '../../../../../src/client/backup/import/externally/Externally'
import {locator} from '../../../testHelpers'
import {BackupLocation} from '../../../../../src/client/actions/BackupActionCreators'
import {noop} from 'lodash'
import * as gateway from '../../../../../src/client/gateways/Gateway'
import * as backupGateway from '../../../../../src/client/gateways/BackupGateway'

describe('import <Externally/>', () => {

  const DEFAULT_PROPS = {
    location: BackupLocation.GITHUB,
    backupSetId: noop,
    backupSetUrl: noop,
    id: '',
    url: '',
    help: <div/>,
    accessTokenRequired: undefined,
    setConfiguration: noop
  }

  beforeEach(() => {
    jest.spyOn(backupGateway, 'importConfiguration')
    jest.spyOn(gateway, 'send').mockResolvedValue({configuration: '{}'})
  })

  test('should import configuration when an ID and URL are given', async () => {
    const setConfiguration = jest.fn()
    const props = {
      ...DEFAULT_PROPS,
      location: BackupLocation.GITHUB,
      accessTokenRequired: false,
      id: 'some-id',
      url: 'some-url',
      setConfiguration
    }

    const wrapper = shallow(<Externally {...props} />)
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    await wrapper.find(locator('import-externally')).prop('onClick')()

    expect(wrapper.find(locator('messages')).prop('messages')).toContain('Successfully imported configuration')
    expect(backupGateway.importConfiguration).toHaveBeenCalledWith(BackupLocation.GITHUB, 'some-id', '', 'some-url')
    expect(gateway.send).toHaveBeenCalled()
    expect(setConfiguration).toHaveBeenCalled()
  })

  test('should not import configuration when access token is required but not provided', async () => {
    const setConfiguration = jest.fn()
    const props = {
      ...DEFAULT_PROPS,
      accessTokenRequired: true,
      id: 'some-id',
      url: 'some-url',
      setConfiguration
    }

    const wrapper = shallow(<Externally {...props} />)
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    await wrapper.find(locator('import-externally')).prop('onClick')()

    expect(wrapper.find(locator('messages')).prop('messages')).toContain('You must provide an access token to import')
    expect(backupGateway.importConfiguration).not.toHaveBeenCalled()
    expect(gateway.send).not.toHaveBeenCalled()
    expect(setConfiguration).not.toHaveBeenCalled()
  })

  test('should not import configuration when ID is missing', async () => {
    const setConfiguration = jest.fn()
    const props = {
      ...DEFAULT_PROPS,
      accessTokenRequired: false,
      id: '',
      url: 'some-url',
      setConfiguration
    }

    const wrapper = shallow(<Externally {...props} />)
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    await wrapper.find(locator('import-externally')).prop('onClick')()

    expect(wrapper.find(locator('messages')).prop('messages')).toContain('You must provide an ID to import')
    expect(backupGateway.importConfiguration).not.toHaveBeenCalled()
    expect(gateway.send).not.toHaveBeenCalled()
    expect(setConfiguration).not.toHaveBeenCalled()
  })

  test('should not import configuration when URL is missing', async () => {
    const setConfiguration = jest.fn()
    const props = {
      ...DEFAULT_PROPS,
      accessTokenRequired: false,
      id: 'some-id',
      url: '',
      setConfiguration
    }

    const wrapper = shallow(<Externally {...props} />)
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    await wrapper.find(locator('import-externally')).prop('onClick')()

    expect(wrapper.find(locator('messages')).prop('messages')).toContain('You must provide a URL to import from')
    expect(backupGateway.importConfiguration).not.toHaveBeenCalled()
    expect(gateway.send).not.toHaveBeenCalled()
    expect(setConfiguration).not.toHaveBeenCalled()
  })

  test('should display an message if an error occurs while importing', async () => {
    const setConfiguration = jest.fn()
    jest.spyOn(gateway, 'send').mockRejectedValue({message: 'some-error'})

    const props = {
      ...DEFAULT_PROPS,
      accessTokenRequired: false,
      id: 'some-id',
      url: 'some-url',
      setConfiguration
    }

    const wrapper = shallow(<Externally {...props} />)
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    await wrapper.find(locator('import-externally')).prop('onClick')()

    expect(wrapper.find(locator('messages')).prop('messages')).toContain('some-error')
    expect(setConfiguration).not.toHaveBeenCalled()
  })

  test('should display an message if the imported configuration is invalid', async () => {
    const setConfiguration = jest.fn()
    jest.spyOn(gateway, 'send').mockResolvedValue({configuration: '{'})

    const props = {
      ...DEFAULT_PROPS,
      accessTokenRequired: false,
      id: 'some-id',
      url: 'some-url',
      setConfiguration
    }

    const wrapper = shallow(<Externally {...props} />)
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    await wrapper.find(locator('import-externally')).prop('onClick')()

    expect(wrapper.find(locator('messages')).prop('messages')).toContain('Unexpected end of JSON input')
    expect(setConfiguration).not.toHaveBeenCalled()
  })
})
