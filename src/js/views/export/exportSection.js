const React = require('react')
const LinkedStateMixin = require('react-addons-linked-state-mixin')
const ValidationMessages = require('../general/validationMessages')
const ConfigurationStore = require('../../stores/ConfigurationStore')
const ConfigurationActions = require('../../actions/ConfigurationActions')
const Clipboard = require('clipboard')

function getStateFromStore(currentImportData) {
  const importError = ConfigurationStore.getImportError()
  return {
    configuration: ConfigurationStore.getConfiguration(),
    importing: ConfigurationStore.isImporting(),
    exporting: ConfigurationStore.isExporting(),
    importErrors: importError,
    importData: importError ? currentImportData : '',
    exportMessage: '',
    exportErrors: []
  }
}

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState() {
    return getStateFromStore('')
  },

  componentDidMount() {
    ConfigurationStore.addListener(this._onChange)

    const clipboard = new Clipboard('#copy-to-clipboard')
    clipboard.on('error', () => {
      this.setState({exportErrors: ['Unfortunately your browser doesn\'t support automatically copying to clipboard, please manually copy']})
    })

    clipboard.on('success', e => {
      this.setState({exportMessage: 'Successfully copied to clipboard'})
      e.clearSelection()
    })

    this.setState({clipboard: clipboard})

    ConfigurationActions.exportData()
  },

  componentWillUnmount() {
    ConfigurationStore.removeListener(this._onChange)
    this.state.clipboard.destroy()
  },

  render() {
    const exportMessage = <div className='export-info-message'>
      <span className='icon-checkmark'></span>
      <span className='text-with-icon'>{this.state.exportMessage}</span>
    </div>

    return (
      <section className='dashboard-main-section'>
        <h2 className='visually-hidden'>Export</h2>

        <section className='sub-section'>
          <h3 className='section-title'>Import</h3>
            <textarea className='export-text'
                      placeholder='paste exported configuration here and press import'
                      valueLink={this.linkState('importData')}
                      spellCheck='false'/>
          <button className='button-primary'
                  onClick={this._import}
                  disabled={this.state.importing}>
            import
          </button>
          <ValidationMessages messages={this.state.importErrors}/>
        </section>
        <section className='sub-section'>
          <h3 className='section-title'>Export</h3>
            <pre>
              <textarea id='export-data'
                        className='export-text'
                        placeholder='loading...'
                        value={JSON.stringify(this.state.configuration, null, 2)}
                        readOnly='true'
                        spellCheck='false'/>
            </pre>
          <button id='copy-to-clipboard'
                  className='button-primary'
                  data-clipboard-target='#export-data'
                  disabled={this.state.exporting}>
            copy to clipboard
          </button>
          <ValidationMessages messages={this.state.exportErrors}/>
          {this.state.exportMessage ? exportMessage : ''}
        </section>
      </section>
    )
  },

  _onChange() {
    this.setState(getStateFromStore(this.state.importData))
  },

  _import() {
    ConfigurationActions.importData(this.state.importData)
  }
})
