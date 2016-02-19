const React = require('react')
const ConfigOption = require('./configOption')
const Container = require('../general/container')
const DisplayStore = require('../../stores/DisplayStore')
const DisplayActions = require('../../actions/DisplayActions')

function getStateFromStore() {
  return {
    showBrokenBuildTimers: DisplayStore.areBrokenBuildTimersEnabled()
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

  _onToggle(newValue) {
    DisplayActions.setBrokenBuildTimers(newValue)
  },

  render() {
    return (
      <section className='dashboard-main-section'>
        <Container title='Display Settings'>
          <div className="section-body">
            <fieldset className='settings-list'>
              <ConfigOption name='Show broken build timers'
                            enabled={this.state.showBrokenBuildTimers}
                            onToggle={this._onToggle}/>
            </fieldset>
          </div>
        </Container>
      </section>
    )
  },

  _onChange() {
    this.setState(getStateFromStore())
  }
})
