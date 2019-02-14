import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction'
import createHistory from 'history/createBrowserHistory'
import {Redirect, Route, Router, Switch} from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'
import {Map} from 'immutable'
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
import _ from 'lodash'
import {UnhandledError} from './UnhandledError'
import {loaded} from './reducers/Selectors'
import Modal from 'react-modal'

const ONE_SECOND = 1000

const initialState = Map()
let store = createStore(reducer, initialState, composeWithDevTools(
  applyMiddleware(thunkMiddleware)
))

const save = async () => {
  const state = store.getState()
  if (loaded(state) === true) {
    await repositorySave(filter(state.toJS()))
  }
}
const saveDebounced = _.debounce(save, 200, {maxWait: ONE_SECOND})

store.subscribe(() => saveDebounced())

const history = createHistory()

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
