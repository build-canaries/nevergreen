import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {reducer, State} from './Reducer'
import {Nevergreen} from './Nevergreen'
import {UnhandledError} from './UnhandledError'
import Modal from 'react-modal'
import {configureStore} from '@reduxjs/toolkit'
import {save} from './configuration/SaveListener'
import {backup} from './backup/remote/AutomaticBackupListener'

const store = configureStore({reducer})
let previousState: State

store.subscribe(() => {
  const currentState = store.getState()
  void save(currentState)
  void backup(previousState, currentState, store.dispatch)
  previousState = currentState
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
