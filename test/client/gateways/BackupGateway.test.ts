import {exportConfiguration, fetchConfiguration} from '../../../src/client/gateways/BackupGateway'
import * as gateway from '../../../src/client/gateways/Gateway'
import {fakeRequest} from '../../../src/client/gateways/Gateway'

describe('exportConfiguration', () => {

  it('should call the export URL', () => {
    jest.spyOn(gateway, 'post')
    const where = 'where'
    const id = 'some-id'
    const token = 'some-token'
    const description = 'some-description'
    const configuration = 'some-configuration'
    const url = 'some-url'
    exportConfiguration(where, id, description, configuration, token, url)
    expect(gateway.post).toBeCalledWith('/api/export', {where, id, description, configuration, token, url})
  })
})

describe('fetchConfiguration', () => {

  it('should call the import URL', () => {
    jest.spyOn(gateway, 'post')
    const from = 'from'
    const id = 'some-id'
    const token = 'some-token'
    const url = 'some-url'
    fetchConfiguration(from, id, token, url)
    expect(gateway.post).toBeCalledWith('/api/import', {from, id, token, url})
  })
})
