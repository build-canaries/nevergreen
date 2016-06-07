import React, {Component} from 'react'
import {fetchInteresting} from './MonitorActions'
import InterestingProjectsStore from '../stores/InterestingProjectsStore'
import TrayStore from '../stores/TrayStore'
import SelectedProjectsStore from '../stores/SelectedProjectsStore'
import SuccessStore from '../stores/SuccessStore'
import DisplayStore from '../stores/DisplayStore'
import Monitor from './Monitor'

function getStateFromStore() {
  return {
    projects: InterestingProjectsStore.getAll(),
    error: InterestingProjectsStore.getLastError(),
    loading: false,
    brokenBuildSoundEnabled: DisplayStore.areBrokenBuildSoundsEnabled(),
    showBrokenBuildTimers: DisplayStore.areBrokenBuildTimersEnabled(),
    playBrokenBuildSounds: DisplayStore.areBrokenBuildSoundsEnabled(),
    brokenBuildFx: DisplayStore.brokenBuildSoundFx(),
    successMessage: SuccessStore.randomMessage
  }
}

function animateMenu(state) {
  clearTimeout(state.menuTimer)

  Array.from(document.querySelectorAll('#menu .navigation, .content-info, .notification')).forEach((elem) => {
    elem.classList.remove('navigation-hide')
    elem.classList.add('navigation-show')
  })
}

function hideMenu() {
  Array.from(document.querySelectorAll('#menu .navigation, .content-info, .notification')).forEach((elem) => {
    elem.classList.remove('navigation-show')
    elem.classList.add('navigation-hide')
  })
}

class MonitorContainer extends Component {

  constructor(props) {
    super(props)
    this.state = Object.assign(getStateFromStore(), {loading: true})
  }

  componentDidMount() {
    const callback = () => this.setState(getStateFromStore())
    this.setState({callback})

    window.addEventListener('resize', callback)
    InterestingProjectsStore.addListener(callback)
    DisplayStore.addListener(callback)

    hideMenu()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.callback)
    InterestingProjectsStore.removeListener(this.state.callback)
    DisplayStore.removeListener(this.state.callback)

    animateMenu(this.state)
  }

  render() {
    const poll = () => {
      fetchInteresting(TrayStore.getAll(), SelectedProjectsStore.getAll()).then(() => {
        const pollingTimer = setTimeout(() => {
          poll()
        }, 5000)
        this.setState({pollingTimer})
      })
    }
    const stopPolling = () => {
      clearTimeout(this.state.pollingTimer)
    }
    const showMenu = () => {
      animateMenu(this.state)
      this.setState({
        menuTimer: setTimeout(() => {
          hideMenu()
        }, 3000)
      })
    }

    return <Monitor {...this.state} poll={poll} stopPolling={stopPolling} showMenu={showMenu}/>
  }
}

export default MonitorContainer
