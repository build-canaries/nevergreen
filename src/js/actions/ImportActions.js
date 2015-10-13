var AppDispatcher = require('../dispatcher/AppDispatcher')
var Constants = require('../constants/NevergreenConstants')
var LocalRepository = require('../storage/LocalRepository')

function dispatchError(message) {
  AppDispatcher.dispatch({
    type: Constants.ImportError,
    message: message
  })
}

module.exports = {

  importData: function (jsonData) {
    try {
      var data = JSON.parse(jsonData)

      AppDispatcher.dispatch({
        type: Constants.ImportingData,
        data: data
      })

      LocalRepository.importData(data)
        .then(function () {
          AppDispatcher.dispatch({
            type: Constants.ImportedData,
            data: data
          })
        })
        .then(LocalRepository.load)
        .then(function () {
          AppDispatcher.dispatch({
            type: Constants.ImportLoaded
          })
        })
        .catch(function (e) {
          dispatchError('Unable to import - ' + e.message)
        })

    } catch (e) {
      dispatchError('Invalid JSON - ' + e.message)
    }
  }

}
