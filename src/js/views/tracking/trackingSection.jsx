var React = require('react/addons')
var AddTray = require('./addTray')
var Tray = require('./tray')
var TrayStore = require('../../stores/TrayStore')
var TrayActions = require('../../actions/TrayActions')

function getStateFromStore() {
  return {
    trays: TrayStore.getAll(),
    validation: TrayStore.getValidationObject()
  }
}

module.exports = React.createClass({
  displayName: 'TrackingSection',

  getInitialState: function () {
    return getStateFromStore()
  },

  componentDidMount: function () {
    TrayStore.addListener(this._onChange)
  },

  componentWillUnmount: function () {
    TrayStore.removeListener(this._onChange)
  },

  render: function () {
    return (
      <section className='dashboard-main-section active'>
        <h2 className='visually-hidden'>Tracking</h2>

        <fieldset className='tracking-cctray-group'>
          <AddTray addTray={this._addTray} validationMessages={this.state.validation.messages}/>

          <div>
            {
              this.state.trays.map(function (tray) {
                return <Tray key={tray.trayId}
                             tray={tray}
                             removeTray={this._removeTray.bind(this, tray.trayId)}
                             refreshTray={this._refreshTray.bind(this, tray)}/>
              }, this)
            }
          </div>
        </fieldset>
      </section>
    )
  },

  _addTray: function (trayToAdd) {
    TrayActions.addTray(trayToAdd.url, trayToAdd.username, trayToAdd.password)
  },

  _removeTray: function (trayId) {
    TrayActions.removeTray(trayId)
  },

  _refreshTray: function (tray) {
    TrayActions.refreshTray(tray)
  },

  _onChange: function () {
    if (this.isMounted()) {
      this.setState(getStateFromStore())
    }
  }
})
