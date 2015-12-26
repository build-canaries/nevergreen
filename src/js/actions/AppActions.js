const AppDispatcher = require('../dispatcher/AppDispatcher')
const Constants = require('../constants/NevergreenConstants')
const LocalRepository = require('../storage/LocalRepository')
const Validation = require('../validation')

module.exports = {
  init() {
    Validation.init()
    LocalRepository.init()
    LocalRepository.getConfiguration().then(configuration => {
      AppDispatcher.dispatch({
        type: Constants.AppInit,
        configuration: configuration
      })
    })
  }
}
