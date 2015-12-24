const React = require('react')
const ConfigOption = require('./configOption')
const ConfigurationStore = require('../../stores/ConfigurationStore')
const DisplayActions = require('../../actions/DisplayActions')

function getStateFromStore() {
  return {
    showBrokenBuildTimers: ConfigurationStore.areBrokenBuildTimersEnabled()
  }
}

module.exports = React.createClass({
  getInitialState: function () {
    return getStateFromStore()
  },

  componentDidMount: function () {
    ConfigurationStore.addListener(this._onChange)
  },

  componentWillUnmount: function () {
    ConfigurationStore.removeListener(this._onChange)
  },

  _onToggle: function (newValue) {
    DisplayActions.setBrokenBuildTimers(newValue)
  },

  render: function () {
    return (
      <section className='dashboard-main-section'>
        <h2 className='visually-hidden'>Display</h2>
        <section className='sub-section'>
          <h3 className='section-title'>Display Settings</h3>
          <fieldset className='settings-list'>
            <ConfigOption name='Show broken build timers' enabled={this.state.showBrokenBuildTimers} onToggle={this._onToggle}/>
          </fieldset>
        </section>
      </section>
    )
  },

  _onChange: function () {
    this.setState(getStateFromStore())
  }
})
