import 'whatwg-fetch'
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {Router, browserHistory} from 'react-router'
import thunkMiddleware from 'redux-thunk'
import Immutable from 'immutable'
import routes from './routes'
import LocalRespoistory from './common/repo/LocalRepository'
import {reducer} from './reducers/Reducer'
import {filter} from './common/repo/Data'

const initialState = Immutable.Map()
let store = createStore(reducer, initialState, compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

store.subscribe(() => {
  LocalRespoistory.save(filter(store.getState().toJS()))
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('root'))
