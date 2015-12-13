var React = require('react/addons')
var ValidationMessages = require('../general/validationMessages')
var ConfigurationStore = require('../../stores/ConfigurationStore')
var ConfigurationActions = require('../../actions/ConfigurationActions')
var Clipboard = require('clipboard')

function getStateFromStore(currentImportData) {
  var importError = ConfigurationStore.getImportError()
  return {
    configuration: ConfigurationStore.getConfiguration(),
    loading: ConfigurationStore.isLoading(),
    importErrors: importError,
    importData: importError ? currentImportData : '',
    exportMessage: '',
    exportErrors: []
  }
}

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return getStateFromStore('')
  },

  componentDidMount: function () {
    ConfigurationStore.addListener(this._onChange)

    var clipboard = new Clipboard('#copy-to-clipboard')
    clipboard.on('error', function () {
      this.setState({exportErrors: ['Unfortunately your browser doesn\'t support automatically copying to clipboard, please manually copy']})
    }.bind(this))

    clipboard.on('success', function (e) {
      this.setState({exportMessage: 'Successfully copied to clipboard'})
      e.clearSelection()
    }.bind(this))

    this.setState({clipboard: clipboard})
  },

  componentWillUnmount: function () {
    ConfigurationStore.removeListener(this._onChange)
    this.state.clipboard.destroy()
  },

  render: function () {
    var exportMessage = <div className='export-info-message'>
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
                  disabled={this.state.loading}>
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
                  disabled={this.state.loading}>
            copy to clipboard
          </button>
          <ValidationMessages messages={this.state.exportErrors}/>
          {this.state.exportMessage ? exportMessage : ''}
        </section>
      </section>
    )
  },

  _onChange: function () {
    this.setState(getStateFromStore(this.state.importData))
  },

  _import: function () {
    ConfigurationActions.importData(this.state.importData)
  }
})
