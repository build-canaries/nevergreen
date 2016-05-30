jest.dontMock('../../../src/js/stores/SuccessStore')
  .dontMock('../../../src/js/constants/NevergreenConstants')
  .dontMock('../../../src/js/success/SuccessActions')

describe('success store', () => {

  let store, AppDispatcher, Constants, SuccessActions, callback

  beforeEach(() => {
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    SuccessActions = require('../../../src/js/success/SuccessActions')
    store = require('../../../src/js/stores/SuccessStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({
      type: Constants.AppInit,
      configuration: {
        success: {
          messages: []
        }
      }
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  it('adds a message', () => {
    callback({
      type: SuccessActions.MessageAdd,
      message: 'some-message'
    })
    expect(store.getMessages()).toEqual(['some-message'])
  })

  it('adds an image', () => {
    callback({
      type: SuccessActions.MessageAdd,
      message: 'http://some-url'
    })
    expect(store.getImages()).toEqual(['http://some-url'])
  })

  it('removes a message', () => {
    callback({
      type: SuccessActions.MessageAdd,
      message: 'some-message'
    })
    callback({
      type: SuccessActions.MessageRemove,
      message: 'some-message'
    })
    expect(store.getMessages()).toEqual([])
  })

  it('removes an image', () => {
    callback({
      type: SuccessActions.MessageAdd,
      message: 'http://some-url'
    })
    callback({
      type: SuccessActions.MessageRemove,
      message: 'http://some-url'
    })
    expect(store.getImages()).toEqual([])
  })

  it('returns a blank random message if none have been added', () => {
    expect(store.randomMessage()).toEqual('')
  })

  it('returns a random message', () => {
    callback({
      type: SuccessActions.MessageAdd,
      message: 'some-message'
    })
    callback({
      type: SuccessActions.MessageAdd,
      message: 'http://some-url'
    })
    expect(store.randomMessage()).not.toEqual('')
  })

  it('can return just messages', () => {
    callback({
      type: SuccessActions.MessageAdd,
      message: 'some-message'
    })
    callback({
      type: SuccessActions.MessageAdd,
      message: 'http://some-url'
    })
    expect(store.getMessages()).toEqual(['some-message'])
  })

  it('can return just images', () => {
    callback({
      type: SuccessActions.MessageAdd,
      message: 'some-message'
    })
    callback({
      type: SuccessActions.MessageAdd,
      message: 'http://some-url'
    })
    expect(store.getImages()).toEqual(['http://some-url'])
  })

  it('can return all images and messages', () => {
    callback({
      type: SuccessActions.MessageAdd,
      message: 'some-message'
    })
    callback({
      type: SuccessActions.MessageAdd,
      message: 'http://some-url'
    })
    expect(store.getAll()).toEqual(['some-message', 'http://some-url'])
  })

  it('clears the store state when new data is imported', () => {
    callback({
      type: Constants.ImportedData
    })
    expect(store.getAll()).toEqual([])
  })

  describe('knows if a string is a url or not', () => {
    it('returns true for any string starting with http', () => {
      expect(store.isUrl('http')).toBeTruthy()
    })

    it('if returns false if the string does not start with http', () => {
      expect(store.isUrl('ftp')).toBeFalsy()
    })
  })

  describe('validation', () => {
    it('returns an error message if the storage key does not exist', () => {
      const obj = {}
      expect(store.validate(obj)).toEqual([jasmine.any(String)])
    })

    it('returns an error message if the messages key does not exist', () => {
      const obj = {
        success: {}
      }
      expect(store.validate(obj)).toEqual([jasmine.any(String)])
    })

    it('returns an error message if the messages key is not an array', () => {
      const obj = {
        success: {
          messages: 'not-an-array'
        }
      }
      expect(store.validate(obj)).toEqual([jasmine.any(String)])
    })

    it('returns an error message if the messages key is an array with elements that are not strings', () => {
      const obj = {
        success: {
          messages: ['ok', 1, 'also-ok']
        }
      }
      expect(store.validate(obj)).toEqual([jasmine.any(String)])
    })
  })

})
