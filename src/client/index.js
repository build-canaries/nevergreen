import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, compose, createStore} from 'redux'
import {browserHistory, Router} from 'react-router'
import thunkMiddleware from 'redux-thunk'
import Immutable from 'immutable'
import routes from './routes'
import LocalRespoistory from './common/repo/LocalRepository'
import {reducer} from './reducers/Reducer'
import {filter} from './common/repo/Data'
import {navigated} from './actions/NevergreenActions'
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

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} onUpdate={() => store.dispatch(navigated())}/>
  </Provider>,
  document.getElementById('root'))
