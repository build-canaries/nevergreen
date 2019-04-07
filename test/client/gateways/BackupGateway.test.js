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
      exportConfiguration(where, id, description, configuration, token)
      expect(gateway.post).toBeCalledWith('/api/export', {where, id, description, configuration, token})
    })
  })

  describe('importConfiguration', () => {

    test('should call the import URL', () => {
      const from = 'from'
      const id = 'some-id'
      const token = 'some-token'
      importConfiguration(from, id, token)
      expect(gateway.post).toBeCalledWith('/api/import', {from, id, token})
    })
  })
})
