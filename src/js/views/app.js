import React, {Component} from 'react'
import Menu from './general/menu'
import Notification from './general/Notification'
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'
import UiActions from '../actions/UiActions'
import NotificationActions from '../actions/NotificationActions'
import NotificationStore from '../stores/NotificationStore'
import Mousetrap from 'mousetrap'

require('mousetrap/plugins/global-bind/mousetrap-global-bind') // adds bindGlobal to Mousetrap

const twentyFourHours = 24 * 60 * 60 * 1000

function getStateFromStore() {
  return {
    loaded: AppStore.isInitalised(),
    versionNumber: AppStore.versionNumber(),
    versionName: AppStore.versionName(),
    versionColour: AppStore.versionColour(),
    commitHash: AppStore.commitHash(),
    notification: NotificationStore.getNotification()
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      versionNumber: 'loading...',
      versionName: 'loading...',
      versionColour: '#7e7e7e',
      commitHash: '#####',
      notification: ''
    }
  }

  componentWillMount() {
    const callback = () => this.setState(getStateFromStore())
    this.setState({callback})

    AppStore.addListener(callback)
    NotificationStore.addListener(callback)
    AppActions.init()

    const versionCheckId = setInterval(NotificationActions.pollForNewVersion, twentyFourHours)
    this.setState({versionCheckId})

    Mousetrap.bindGlobal('esc', () => {
      document.activeElement.blur()
    })

    Mousetrap.bind('?', () => {
      UiActions.showKeyboardShortcuts()
    })
  }

  componentWillUnmount() {
    AppStore.removeListener(this.state.callback)
    NotificationStore.removeListener(this.state.callback)

    clearInterval(this.state.versionCheckId)

    Mousetrap.unbind('?')
  }

  render() {
    return (
      <div>
        <h1 className='visually-hidden'>Nevergreen</h1>

        <div id='menu'>
          <Menu versionNumber={this.state.versionNumber}
                versionName={this.state.versionName}
                versionColour={this.state.versionColour}
                commitHash={this.state.commitHash}/>
        </div>
        <Notification message={this.state.notification} dismiss={NotificationActions.dismiss}/>
        {this.state.loaded ? this.props.children : ''}
      </div>
    )
  }
}

export default App
