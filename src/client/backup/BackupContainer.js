import React, {Component} from 'react'
import ConfigurationStore from '../stores/ConfigurationStore'
import UiMessageStore from '../stores/UiMessageStore'
import {exportData, importData} from './BackupActions'
import Backup from './Backup'
import AppDispatcher from '../common/AppDispatcher'

function mapStateToProps() {
  return {
    exporting: ConfigurationStore.isExporting(),
    configuration: JSON.stringify(ConfigurationStore.getConfiguration(), null, 2),
    importing: ConfigurationStore.isImporting(),
    importErrors: UiMessageStore.getImportErrors(),
    importInfos: UiMessageStore.getImportInfos(),
    importData(jsonData) {
      importData(jsonData)(AppDispatcher)
    },
    refresh() {
      exportData()(AppDispatcher)
    }
  }
}

class BackupComponent extends Component {
  constructor(props) {
    super(props)
    this.state = mapStateToProps()
  }

  componentDidMount() {
    const callback = () => this.setState(mapStateToProps())
    ConfigurationStore.addListener(callback)
    UiMessageStore.addListener(callback)
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
