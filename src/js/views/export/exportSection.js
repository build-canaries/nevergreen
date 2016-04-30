import React, {Component} from 'react'
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

class ExportSection extends Component {
  constructor(props) {
    super(props)
    this.state = getStateFromStore()
  }

  componentDidMount() {
    const callback = () => this.setState(getStateFromStore())
    ConfigurationStore.addListener(callback)
    UiMessageStore.addListener(callback)
    ConfigurationActions.refreshConfiguration()
    this.setState({callback})
  }

  componentWillUnmount() {
    ConfigurationStore.removeListener(this.state.callback)
    UiMessageStore.removeListener(this.state.callback)
  }

  render() {
    return (
      <section className='dashboard-main-section'>
        <h2 className='visually-hidden'>Export</h2>
        <Import errors={this.state.importErrors} infos={this.state.importInfos} loading={this.state.importing}/>
        <Export configuration={JSON.stringify(this.state.configuration, null, 2)} loading={this.state.exporting}/>
      </section>
    )
  }
}

export default ExportSection
