import {exportConfiguration, importConfiguration} from '../../../src/client/gateways/BackupGateway'
import * as gateway from '../../../src/client/gateways/Gateway'

describe('BackupGateway', () => {

  gateway.post = jest.fn()

  describe('exportConfiguration', () => {

    test('should call the export URL', () => {
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

  describe('importConfiguration', () => {

    test('should call the import URL', () => {
      const from = 'from'
      const id = 'some-id'
      const token = 'some-token'
      const url = 'some-url'
      importConfiguration(from, id, token, url)
      expect(gateway.post).toBeCalledWith('/api/import', {from, id, token, url})
    })
  })
})
