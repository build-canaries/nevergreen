import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {init, load, save as repositorySave} from './configuration/LocalRepository'
import {reducer} from './Reducer'
import {filter, toConfiguration} from './configuration/Configuration'
import {Nevergreen} from './Nevergreen'
import {debounce, join} from 'lodash'
import {UnhandledError} from './UnhandledError'
import Modal from 'react-modal'
import {configureStore} from 'redux-starter-kit'
import {Loading} from './common/Loading'
import {isBlank} from './common/Utils'

const ONE_SECOND = 1000

async function initialiseNevergreen() {
  await init()
  const [errors, preloadedState] = toConfiguration(await load())

  console.log(preloadedState)

  if (!isBlank(errors)) {
    throw new Error(`Unable to initalise Nevergreen because of configuration loadings errors [${join(errors, ', ')}]`)
  }

  const store = configureStore({
    reducer,
    preloadedState
  })

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
          <Nevergreen/>
        </Router>
      </Provider>
    </UnhandledError>,
    document.getElementById('root'))
}

const Index = () => {
  useEffect(() => {
    initialiseNevergreen()
  }, [])

  return (
    <UnhandledError>
      <Loading loaded={false}/>
    </UnhandledError>
  )
}

ReactDOM.render(<Index/>, document.getElementById('root'))
