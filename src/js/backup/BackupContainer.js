import React, {Component} from 'react'
import ConfigurationStore from '../stores/ConfigurationStore'
import UiMessageStore from '../stores/UiMessageStore'
import {refreshConfiguration, importData} from './BackupActions'
import Backup from './Backup'

function getStateFromStore() {
  return {
    exporting: ConfigurationStore.isExporting(),
    configuration: ConfigurationStore.getConfiguration(),
    importing: ConfigurationStore.isImporting(),
    importErrors: UiMessageStore.getImportErrors(),
    importInfos: UiMessageStore.getImportInfos(),
    importData
  }
}

class BackupComponent extends Component {
  constructor(props) {
    super(props)
    this.state = getStateFromStore()
  }

  componentDidMount() {
    const callback = () => this.setState(getStateFromStore())
    ConfigurationStore.addListener(callback)
    UiMessageStore.addListener(callback)
    refreshConfiguration()
    this.setState({callback})
  }

  componentWillUnmount() {
    ConfigurationStore.removeListener(this.state.callback)
    UiMessageStore.removeListener(this.state.callback)
  }

  render() {
    return <Backup {...this.state} />
  }
}

export default BackupComponent
