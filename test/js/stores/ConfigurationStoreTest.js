jest.dontMock('../../../src/js/stores/ConfigurationStore')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('configuration store', () => {

  let AppDispatcher, Constants, store, callback

  beforeEach(() => {
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    store = require('../../../src/js/stores/ConfigurationStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({
      type: Constants.AppInit
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  describe('importing data', () => {
    beforeEach(() => {
      callback({
        type: Constants.ImportingData
      })
    })

    it('sets importing to true', () => {
      expect(store.isImporting()).toBeTruthy()
    })

    it('sets exporting to true', () => {
      expect(store.isExporting()).toBeTruthy()
    })

    it('clears import error messages', () => {
      expect(store.getImportError()).toEqual([])
    })
  })

  describe('import error', () => {
    beforeEach(() => {
      callback({
        type: Constants.ImportError,
        messages: ['some-error']
      })
    })

    it('sets importing to false', () => {
      expect(store.isImporting()).toBeFalsy()
    })

    it('sets exporting to false', () => {
      expect(store.isExporting()).toBeFalsy()
    })

    it('sets import error messages', () => {
      expect(store.getImportError()).toEqual(['some-error'])
    })
  })

  describe('export data', () => {
    beforeEach(() => {
      callback({
        type: Constants.ExportData,
        configuration: 'some-configuration'
      })
    })

    it('sets exporting to false', () => {
      expect(store.isExporting()).toBeFalsy()
    })

    it('sets the configuration', () => {
      expect(store.getConfiguration()).toEqual('some-configuration')
    })
  })

  it('sets importing to false once configuration is restored', () => {
    callback({
      type: Constants.RestoreConfiguration
    })
    expect(store.isImporting()).toBeFalsy()
  })
})
