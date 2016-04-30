import React from 'react'
import AddTray from './addTray'
import Tray from './tray'
import TrayStore from '../../stores/TrayStore'
import TrayActions from '../../actions/TrayActions'

function getStateFromStore() {
  return {
    trays: TrayStore.getAll()
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
        <AddTray addTray={this._addTray}/>

        <div>
          {
            this.state.trays.map((tray, index) => {
              return <Tray key={tray.trayId}
                           index={index}
                           tray={tray}
                           removeTray={this._removeTray.bind(this, tray.trayId)}
                           refreshTray={this._refreshTray.bind(this, tray)}
                           updateTray={this._updateTray}/>
            })
          }
        </div>
      </section>
    )
  },

  _addTray(url, username, password) {
    TrayActions.addTray(url, username, password)
  },

  _removeTray(trayId) {
    TrayActions.removeTray(trayId)
  },

  _refreshTray(tray) {
    TrayActions.refreshTray(tray)
  },

  _updateTray(trayId, name, url, username, password) {
    TrayActions.updateTray(trayId, name, url, username, password)
  },

  _onChange() {
    this.setState(getStateFromStore())
  }
})
