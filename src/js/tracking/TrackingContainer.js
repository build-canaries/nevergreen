import React, {Component} from 'react'
import TrayStore from '../stores/TrayStore'
import {addTray, removeTray, refreshTray, updateTray} from './TrackingActions'
import Tracking from './Tracking'

function getStateFromStore() {
  return {
    trays: TrayStore.getAll(),
    addTray,
    removeTray,
    refreshTray,
    updateTray
  }
}

class TrackingContainer extends Component {
  constructor(props) {
    super(props)
    this.state = getStateFromStore()
  }

  componentWillMount() {
    const callback = () => this.setState(getStateFromStore())
    this.setState({callback})
    TrayStore.addListener(callback)
  }

  componentWillUnmount() {
    TrayStore.removeListener(this.state.callback)
  }

  render() {
    return <Tracking {...this.state}/>
  }
}

export default TrackingContainer
