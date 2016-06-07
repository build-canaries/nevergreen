jest.dontMock('../../../src/js/stores/UiMessageStore')
  .dontMock('../../../src/js/backup/BackupActions')
  .dontMock('../../../src/js/success/SuccessActions')
  .dontMock('../../../src/js/NevergreenActions')

describe('ui message store', () => {

  let AppDispatcher, BackupActions, SuccessActions, NevergreenActions, store, callback

  beforeEach(() => {
    AppDispatcher = require('../../../src/js/common/AppDispatcher')
    SuccessActions = require('../../../src/js/success/SuccessActions')
    BackupActions = require('../../../src/js/backup/BackupActions')
    NevergreenActions = require('../../../src/js/NevergreenActions')
    store = require('../../../src/js/stores/UiMessageStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({
      type: NevergreenActions.AppInit
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  describe('init', () => {
    beforeEach(() => {
      callback({
        type: NevergreenActions.AppInit
      })
    })

    it('starts with no success errors', () => {
      expect(store.getSuccessErrors()).toEqual([])
    })

    it('starts with no import errors', () => {
      expect(store.getImportErrors()).toEqual([])
    })

    it('starts with no import infos', () => {
      expect(store.getImportInfos()).toEqual([])
    })

    it('starts with keyboard shortcuts hidden', () => {
      expect(store.showKeyboardShortcuts()).toBeFalsy()
    })
  })

  describe('restore', () => {
    beforeEach(() => {
      callback({
        type: BackupActions.RestoreConfiguration,
        messages: ['some-message']
      })
    })

    it('clears success errors', () => {
      expect(store.getSuccessErrors()).toEqual([])
    })

    it('clears import errors', () => {
      expect(store.getImportErrors()).toEqual([])
    })

    it('sets import infos to event messages', () => {
      expect(store.getImportInfos()).toEqual(['some-message'])
    })
  })

  describe('adding a success message', () => {
    beforeEach(() => {
      callback({
        type: SuccessActions.MessageInvalidInput,
        errors: ['some-error']
      })
    })

    it('sets errors', () => {
      expect(store.getSuccessErrors()).toEqual(['some-error'])
    })

    it('clears errors on successful add', () => {
      callback({
        type: SuccessActions.MessageAdd
      })
      expect(store.getSuccessErrors()).toEqual([])
    })

    it('clears errors on removal', () => {
      callback({
        type: SuccessActions.MessageRemove
      })
      expect(store.getSuccessErrors()).toEqual([])
    })
  })

  describe('importing data', () => {
    beforeEach(() => {
      callback({
        type: BackupActions.ImportError,
        errors: ['some-error']
      })
    })

    it('sets errors', () => {
      expect(store.getImportErrors()).toEqual(['some-error'])
    })

    it('clears infos', () => {
      expect(store.getImportInfos()).toEqual([])
    })

    it('clears errors and infos when importing', () => {
      callback({
        type: BackupActions.ImportingData
      })
      expect(store.getImportErrors()).toEqual([])
      expect(store.getImportInfos()).toEqual([])
    })
  })

  describe('keyboard shortcuts', () => {
    let cancelCallback

    beforeEach(() => {
      cancelCallback = jest.genMockFn()
      callback({
        type: NevergreenActions.KeyboardShortcuts,
        show: true,
        cancel: cancelCallback
      })
    })

    it('sets show', () => {
      expect(store.showKeyboardShortcuts()).toBeTruthy()
    })

    it('cancels the previous timer if the event is triggered again', () => {
      callback({
        type: NevergreenActions.KeyboardShortcuts,
        show: true,
        cancel: jest.genMockFn()
      })
      expect(cancelCallback).toBeCalled()
    })
  })
})
