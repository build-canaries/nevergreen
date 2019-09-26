import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {save as repositorySave} from './configuration/LocalRepository'
import {reducer} from './Reducer'
import {filter} from './configuration/Configuration'
import {Nevergreen} from './Nevergreen'
import {Monitor} from './monitor/Monitor'
import {Success} from './success/Success'
import {Settings} from './settings/Settings'
import {Backup} from './backup/Backup'
import {StyleGuide} from './styleGuide/StyleGuide'
import {debounce} from 'lodash'
import {UnhandledError} from './UnhandledError'
import Modal from 'react-modal'
import {configureStore} from 'redux-starter-kit'
import {Tracking} from './tracking/Tracking'

const ONE_SECOND = 1000

const store = configureStore({reducer})

const save = async () => {
  const state = store.getState()
  await repositorySave(filter(state))
}
const saveDebounced = debounce(save, 200, {maxWait: ONE_SECOND})

store.subscribe(() => saveDebounced())

Modal.setAppElement('#root')

ReactDOM.render(
  <UnhandledError>
    <Provider store={store}>
      <Router>
        <Nevergreen>
          <Switch>
            <Route exact path='/monitor' component={Monitor}/>
            <Route exact path='/tracking' component={Tracking}/>
            <Route exact path='/success' component={Success}/>
            <Route exact path='/settings' component={Settings}/>
            <Route exact path='/backup' component={Backup}/>
            <Route exact path='/style-guide' component={StyleGuide}/>
            <Route>
              <Redirect to='/tracking'/>
            </Route>
          </Switch>
        </Nevergreen>
      </Router>
    </Provider>
  </UnhandledError>,
  document.getElementById('root'))
