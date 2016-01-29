const AppDispatcher = require('../dispatcher/AppDispatcher')
const Constants = require('../constants/NevergreenConstants')
const LocalRepository = require('../storage/LocalRepository')
const moment = require('moment')

function momentInit() {
  moment.locale('en', {
    relativeTime: {
      future: '%s',
      past: '%s',
      s: '<1m',
      m: '1m',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: '1d',
      dd: '%dd',
      M: '1mo',
      MM: '%dmo',
      y: '1y',
      yy: '%dy'
    }
  })
}

module.exports = {
  init() {
    momentInit()
    LocalRepository.init()
    LocalRepository.getConfiguration().then(configuration => {
      AppDispatcher.dispatch({
        type: Constants.AppInit,
        configuration: configuration
      })
    })
  }
}
