import React, {Component} from 'react'
import AppStore from './stores/AppStore'
import {init, showKeyboardShortcuts} from './NevergreenActions'
import NotificationActions from './actions/NotificationActions'
import NotificationStore from './stores/NotificationStore'
import Nevergreen from './Nevergreen'

function getStateFromStore() {
  return {
    loaded: AppStore.isInitalised(),
    versionNumber: AppStore.versionNumber(),
    versionName: AppStore.versionName(),
    versionColour: AppStore.versionColour(),
    commitHash: AppStore.commitHash(),
    notification: NotificationStore.getNotification(),
    showKeyboardShortcuts,
    init,
    pollForNewVersion: NotificationActions.pollForNewVersion,
    dismiss: NotificationActions.dismiss
  }
}

class NevergreenContainer extends Component {
  constructor(props) {
    super(props)
    this.state = getStateFromStore()
  }

  componentWillMount() {
    const callback = () => this.setState(getStateFromStore())
    this.setState({callback})

    AppStore.addListener(callback)
    NotificationStore.addListener(callback)
  }

  componentWillUnmount() {
    AppStore.removeListener(this.state.callback)
    NotificationStore.removeListener(this.state.callback)
  }

  render() {
    return <Nevergreen {...this.state}>{this.props.children}</Nevergreen>
  }
}

export default NevergreenContainer
