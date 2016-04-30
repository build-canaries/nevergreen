import React, {Component} from 'react'
import ConfigOption from './configOption'
import Container from '../general/container'
import DisplayStore from '../../stores/DisplayStore'
import DisplayActions from '../../actions/DisplayActions'

function getStateFromStore() {
  return {
    showBrokenBuildTimers: DisplayStore.areBrokenBuildTimersEnabled(),
    showBrokenBuildSounds: DisplayStore.areBrokenBuildSoundsEnabled()
  }
}

class DisplaySection extends Component {
  constructor(props) {
    super(props)
    this.state = getStateFromStore()
  }

  componentDidMount() {
    const callback = () => this.setState(getStateFromStore())
    DisplayStore.addListener(callback)
    this.setState({callback})
  }

  componentWillUnmount() {
    DisplayStore.removeListener(this.state.callback)
  }

  render() {
    const toggleBrokenBuilds = (newValue) => DisplayActions.setBrokenBuildTimers(newValue)
    const toggleBrokenSounds = (newValue) => DisplayActions.setBrokenBuildSounds(newValue)

    return (
      <section className='dashboard-main-section'>
        <Container title='Display Settings'>
          <fieldset className='settings-list'>
            <ConfigOption name='Show broken build timers'
                          enabled={this.state.showBrokenBuildTimers}
                          onToggle={toggleBrokenBuilds}/>
          </fieldset>
        </Container>
        <Container title='Audio Settings'>
          <fieldset className='settings-list'>
            <ConfigOption name='Enable sound for broken builds'
                          enabled={this.state.showBrokenBuildSounds}
                          onToggle={toggleBrokenSounds}/>
          </fieldset>
        </Container>
      </section>
    )
  }
}

export default DisplaySection
