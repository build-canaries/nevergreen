import AppDispatcher from '../dispatcher/AppDispatcher'
import {AppInit} from '../constants/NevergreenConstants'
import LocalRepository from '../storage/LocalRepository'
import moment from 'moment'

function momentInit() {
  moment.updateLocale('en', {
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
    LocalRepository.getConfiguration().then((configuration) => {
      AppDispatcher.dispatch({
        type: AppInit,
        configuration
      })
    })
  }
}
