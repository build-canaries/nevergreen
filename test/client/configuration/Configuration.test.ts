import {filter, validate} from '../../../src/client/configuration/Configuration'

describe('Data', () => {

  describe('validate', () => {

    test('allows an empty object as any data not provided gets defaulted', () => {
      const data = {}
      expect(validate(data)).toHaveLength(0)
    })

    test('rejects a tray with a missing ID, as this is required to match projects to the owning tray', () => {
      const data = {
        trays: {
          'some-key': {
            url: 'some-url'
          }
        }
      }
      expect(validate(data)).not.toHaveLength(0)
    })

    test('rejects a tray with a missing URL, as this is required to actually contact the CI server', () => {
      const data = {
        trays: {
          'some-id': {
            trayId: 'some-id'
          }
        }
      }
      expect(validate(data)).not.toHaveLength(0)
    })

    test('rejects a project with a missing ID, as this is required to select projects', () => {
      const data = {
        projects: {
          'some-tray-id': {
            'some-project-id': {name: 'some-name'}
          }
        }
      }
      expect(validate(data)).not.toHaveLength(0)
    })

    test('rejects a project with a missing name, as this is required to display projects on the UI', () => {
      const data = {
        projects: {
          'some-tray-id': {
            'some-project-id': {projectId: 'some-id'}
          }
        }
      }
      expect(validate(data)).not.toHaveLength(0)
    })
  })

  describe('filter', () => {

    test('removes unknown properties', () => {
      const data = {foo: 'bar'}
      expect(filter(data)).toEqual({})
    })

    test('keeps known properties', () => {
      const data = {trays: {}}
      expect(filter(data)).toEqual({trays: {}})
    })
  })
})
