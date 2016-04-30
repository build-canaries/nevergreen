import React from 'react'
import ConfigurationStore from '../../stores/ConfigurationStore'
import UiMessageStore from '../../stores/UiMessageStore'
import ConfigurationActions from '../../actions/ConfigurationActions'
import Import from './import'
import Export from './export'

function getStateFromStore() {
  return {
    exporting: ConfigurationStore.isExporting(),
    configuration: ConfigurationStore.getConfiguration(),
    importing: ConfigurationStore.isImporting(),
    importErrors: UiMessageStore.getImportErrors(),
    importInfos: UiMessageStore.getImportInfos()
  }
}

module.exports = React.createClass({
  displayName: 'ExportSection',

  getInitialState() {
    return getStateFromStore()
  },

  componentDidMount() {
    ConfigurationStore.addListener(this._onChange)
    UiMessageStore.addListener(this._onChange)
    ConfigurationActions.refreshConfiguration()
  },

  componentWillUnmount() {
    ConfigurationStore.removeListener(this._onChange)
    UiMessageStore.removeListener(this._onChange)
  },

  render() {
    return (
      <section className='dashboard-main-section'>
        <h2 className='visually-hidden'>Export</h2>
        <Import errors={this.state.importErrors} infos={this.state.importInfos} loading={this.state.importing}/>
        <Export configuration={JSON.stringify(this.state.configuration, null, 2)} loading={this.state.exporting}/>
      </section>
    )
  },

  _onChange() {
    this.setState(getStateFromStore())
  }
})
