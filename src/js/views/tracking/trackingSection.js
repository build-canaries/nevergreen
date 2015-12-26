const React = require('react')
const AddTray = require('./addTray')
const Tray = require('./tray')
const TrayStore = require('../../stores/TrayStore')
const TrayActions = require('../../actions/TrayActions')

function getStateFromStore() {
  return {
    trays: TrayStore.getAll(),
    validation: TrayStore.getValidationObject()
  }
}

module.exports = React.createClass({
  displayName: 'TrackingSection',

  getInitialState() {
    return getStateFromStore()
  },

  componentWillMount() {
    TrayStore.addListener(this._onChange)
  },

  componentWillUnmount() {
    TrayStore.removeListener(this._onChange)
  },

  render() {
    return (
      <section className='dashboard-main-section'>
        <h2 className='visually-hidden'>Tracking</h2>
        <AddTray addTray={this._addTray} validationMessages={this.state.validation.messages}/>

        <div>
          {
            this.state.trays.map(tray => {
              return <Tray key={tray.trayId}
                           tray={tray}
                           removeTray={this._removeTray.bind(this, tray.trayId)}
                           refreshTray={this._refreshTray.bind(this, tray)}/>
            })
          }
        </div>
      </section>
    )
  },

  _addTray(trayToAdd) {
    TrayActions.addTray(trayToAdd.url, trayToAdd.username, trayToAdd.password)
  },

  _removeTray(trayId) {
    TrayActions.removeTray(trayId)
  },

  _refreshTray(tray) {
    TrayActions.refreshTray(tray)
  },

  _onChange() {
    this.setState(getStateFromStore())
  }
})
