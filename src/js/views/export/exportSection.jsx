var React = require('react/addons')
var ValidationMessages = require('../general/validationMessages')
var ConfigurationStore = require('../../stores/ConfigurationStore')
var ConfigurationActions = require('../../actions/ConfigurationActions')
var _ = require('lodash')

function getStateFromStore(currentImportData) {
  var importError = ConfigurationStore.getImportError()
  return {
    configuration: ConfigurationStore.getConfiguration(),
    loading: ConfigurationStore.isLoading(),
    validationMessages: importError,
    importData: importError ? currentImportData : ''
  }
}

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return getStateFromStore('')
  },

  componentDidMount: function () {
    ConfigurationStore.addListener(this._onChange)
  },

  componentWillUnmount: function () {
    ConfigurationStore.removeListener(this._onChange)
  },

  render: function () {
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
          <ValidationMessages messages={this.state.validationMessages}/>
        </section>
        <section className='sub-section'>
          <h3 className='section-title'>Export</h3>
            <pre>
              <textarea className='export-text'
                        placeholder='loading...'
                        value={JSON.stringify(this.state.configuration, null, 2)}
                        readOnly='true'
                        spellCheck='false'/>
            </pre>
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
