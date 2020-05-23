import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {clear, save as repositorySave} from './configuration/LocalRepository'
import {reducer} from './Reducer'
import {Nevergreen} from './Nevergreen'
import {debounce} from 'lodash'
import {UnhandledError} from './UnhandledError'
import Modal from 'react-modal'
import {configureStore} from '@reduxjs/toolkit'

const ONE_SECOND = 1000

const store = configureStore({reducer})

const save = async () => {
  const currentState = store.getState()
  await clear()
  await repositorySave(currentState)
}
const saveDebounced = debounce(save, 200, {maxWait: ONE_SECOND})

store.subscribe(() => {
  void saveDebounced()
})

Modal.setAppElement('#root')

ReactDOM.render(
  <UnhandledError>
    <Provider store={store}>
      <Router>
        <Nevergreen/>
      </Router>
    </Provider>
  </UnhandledError>,
  document.getElementById('root'))
