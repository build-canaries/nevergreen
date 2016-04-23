const React = require('react')
const ConfigOption = require('./configOption')
const Container = require('../general/container')
const DisplayStore = require('../../stores/DisplayStore')
const DisplayActions = require('../../actions/DisplayActions')

function getStateFromStore() {
  return {
    showBrokenBuildTimers: DisplayStore.areBrokenBuildTimersEnabled(),
    showBrokenBuildSounds: DisplayStore.areBrokenBuildSoundsEnabled()
  }
}

module.exports = React.createClass({
  displayName: 'DisplaySection',

  getInitialState() {
    return getStateFromStore()
  },

  componentDidMount() {
    DisplayStore.addListener(this._onChange)
  },

  componentWillUnmount() {
    DisplayStore.removeListener(this._onChange)
  },

  _onToggleBrokenBuilds(newValue) {
    DisplayActions.setBrokenBuildTimers(newValue)
  },

  _onToggleSounds(newValue) {
    DisplayActions.setBrokenBuildSounds(newValue)
  },

  render() {
    return (
      <section className='dashboard-main-section'>
        <Container title='Display Settings'>
          <fieldset className='settings-list'>
            <ConfigOption name='Show broken build timers'
                          enabled={this.state.showBrokenBuildTimers}
                          onToggle={this._onToggleBrokenBuilds}/>
          </fieldset>
        </Container>
        <Container title='Audio Settings'>
          <fieldset className='settings-list'>
            <ConfigOption name='Enable sound for broken builds'
                          enabled={this.state.showBrokenBuildSounds}
                          onToggle={this._onToggleSounds}/>
          </fieldset>
        </Container>
      </section>
    )
  },

  _onChange() {
    this.setState(getStateFromStore())
  }
})

