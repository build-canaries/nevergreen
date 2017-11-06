import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, compose, createStore} from 'redux'
import createHistory from 'history/createBrowserHistory'
import {Route, Router, Switch} from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'
import Immutable from 'immutable'
import LocalRespoistory from './common/repo/LocalRepository'
import {reducer} from './reducers/Reducer'
import {filter} from './common/repo/Data'
import {navigated} from './actions/NevergreenActionCreators'
import NevergreenContainer from './NevergreenContainer'
import MonitorContainer from './monitor/MonitorContainer'
import TrackingContainer from './tracking/TrackingContainer'
import SuccessContainer from './success/SuccessContainer'
import SettingsContainer from './settings/SettingsContainer'
import BackupContainer from './backup/BackupContainer'
import HelpContainer from './help/HelpContainer'
import _ from 'lodash'

const ONE_SECOND = 1000

const initialState = Immutable.Map()
let store = createStore(reducer, initialState, compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

const save = () => {
  const state = store.getState()
  if (state.getIn(['nevergreen', 'loaded'], false)) {
    LocalRespoistory.save(filter(state.toJS())).catch(() => {
      // TODO: handle save failure
    })
  }
}
const saveDebounced = _.debounce(save, 200, {maxWait: ONE_SECOND})

store.subscribe(() => saveDebounced())

const history = createHistory()

history.listen(() => store.dispatch(navigated()))

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <NevergreenContainer>
        <Switch>
          <Route exact path='/monitor' component={MonitorContainer}/>
          <Route exact path='/tracking' component={TrackingContainer}/>
          <Route exact path='/success' component={SuccessContainer}/>
          <Route exact path='/settings' component={SettingsContainer}/>
          <Route exact path='/backup' component={BackupContainer}/>
          <Route exact path='/help' component={HelpContainer}/>
          <Route component={TrackingContainer}/>
        </Switch>
      </NevergreenContainer>
    </Router>
  </Provider>,
  document.getElementById('root'))
