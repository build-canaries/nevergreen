var React = require('react/addons')
var PersistStore = require('../../stores/PersistStore')
var ImportActions = require('../../actions/ImportActions')
var _ = require('lodash')

function _getStateFromStore() {
  return {
    configuration: PersistStore.getConfiguration(),
    importing: PersistStore.isImporting(),
    importError: PersistStore.getImportError()
  }
}

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return _getStateFromStore()
  },

  componentDidMount: function () {
    PersistStore.addListener(this._onChange)
  },

  componentWillUnmount: function () {
    PersistStore.removeListener(this._onChange)
  },

  render: function () {
    var error = (
      <span className='import-error'>
        <span className='icon-notification'></span>
        <span className='text-with-icon'>{this.state.importError}</span>
      </span>
    )

    return (
      <section className='dashboard-main-section active'>
        <h2 className='visually-hidden'>Export</h2>

        <fieldset className='tracking-cctray-group'>
          <section className='success-section'>
            <h3 className='success-title'>Import</h3>
            <textarea className='export-text'
                      placeholder='paste exported configuration here and press import'
                      valueLink={this.linkState('importData')}/>
            <button className='button-primary'
                    onClick={this._import}
                    disabled={this.state.importing}>
              import
            </button>
            {this.state.importError ? error : ''}
          </section>
          <section className='success-section'>
            <h3 className='success-title'>Export</h3>
            <pre>
              <textarea className='export-text'
                        placeholder='loading...'
                        value={JSON.stringify(this.state.configuration, null, 2)}
                        readOnly/>
            </pre>
          </section>
        </fieldset>
      </section>
    )
  },

  _onChange: function () {
    this.setState(_getStateFromStore())
  },

  _import: function () {
    ImportActions.importData(this.state.importData)
  }
})
