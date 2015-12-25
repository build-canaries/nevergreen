const AppDispatcher = require('../dispatcher/AppDispatcher')
const Constants = require('../constants/NevergreenConstants')
const LocalRepository = require('../storage/LocalRepository')
const Validation = require('../validation')
const ConfigurationActions = require('../actions/ConfigurationActions')

module.exports = {
  init(versionNumber) {
    Validation.init()
    return LocalRepository.init(versionNumber).then(() => {
      AppDispatcher.dispatch({
        type: Constants.AppInit
      })
      ConfigurationActions.load()
    })
  }
}
