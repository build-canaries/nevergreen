jest.dontMock('../../../src/js/stores/ConfigurationStore')
  .dontMock('../../../src/js/constants/NevergreenConstants')
  .dontMock('../../../src/js/backup/BackupActions')
  .dontMock('../../../src/js/NevergreenActions')

describe('configuration store', () => {

  let AppDispatcher, Constants, BackupActions, NevergreenActions, store, callback

  beforeEach(() => {
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    BackupActions = require('../../../src/js/backup/BackupActions')
    NevergreenActions = require('../../../src/js/NevergreenActions')
    store = require('../../../src/js/stores/ConfigurationStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({
      type: NevergreenActions.AppInit
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  describe('importing data', () => {
    beforeEach(() => {
      callback({
        type: BackupActions.ImportingData
      })
    })

    it('sets importing to true', () => {
      expect(store.isImporting()).toBeTruthy()
    })

    it('sets exporting to true', () => {
      expect(store.isExporting()).toBeTruthy()
    })
  })

  describe('import error', () => {
    beforeEach(() => {
      callback({
        type: BackupActions.ImportError,
        errors: ['some-error']
      })
    })

    it('sets importing to false', () => {
      expect(store.isImporting()).toBeFalsy()
    })

    it('sets exporting to false', () => {
      expect(store.isExporting()).toBeFalsy()
    })
  })

  describe('export data', () => {
    beforeEach(() => {
      callback({
        type: BackupActions.ExportData,
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
      type: Constants.RestoreConfiguration,
      messages: ['some-message']
    })
    expect(store.isImporting()).toBeFalsy()
  })
})
