import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createBrowserHistory} from 'history'
import {Redirect, Route, Router, Switch} from 'react-router-dom'
import {save as repositorySave} from './common/LocalRepository'
import {reducer} from './reducers/Reducer'
import {filter} from './reducers/Configuration'
import {navigated} from './actions/NevergreenActionCreators'
import NevergreenContainer from './NevergreenContainer'
import MonitorContainer from './monitor/MonitorContainer'
import TrackingContainer from './tracking/TrackingContainer'
import SuccessContainer from './success/SuccessContainer'
import SettingsContainer from './settings/SettingsContainer'
import BackupContainer from './backup/BackupContainer'
import {StyleGuide} from './styleGuide/StyleGuide'
import {debounce} from 'lodash'
import {UnhandledError} from './UnhandledError'
import Modal from 'react-modal'
import {configureStore} from 'redux-starter-kit'
import {getLoaded} from './reducers/NevergreenReducer'

const ONE_SECOND = 1000

const store = configureStore({reducer})

const save = async () => {
  const state = store.getState()
  if (getLoaded(state)) {
    await repositorySave(filter(state))
  }
}
const saveDebounced = debounce(save, 200, {maxWait: ONE_SECOND})

store.subscribe(() => saveDebounced())

const history = createBrowserHistory()

history.listen(() => store.dispatch(navigated()))

Modal.setAppElement('#root')

ReactDOM.render(
  <UnhandledError>
    <Provider store={store}>
      <Router history={history}>
        <NevergreenContainer>
          <Switch>
            <Route exact path='/monitor' component={MonitorContainer}/>
            <Route exact path='/tracking' component={TrackingContainer}/>
            <Route exact path='/success' component={SuccessContainer}/>
            <Route exact path='/settings' component={SettingsContainer}/>
            <Route exact path='/backup' component={BackupContainer}/>
            <Route exact path='/style-guide' component={StyleGuide}/>
            <Route>
              <Redirect to='/tracking'/>
            </Route>
          </Switch>
        </NevergreenContainer>
      </Router>
    </Provider>
  </UnhandledError>,
  document.getElementById('root'))
