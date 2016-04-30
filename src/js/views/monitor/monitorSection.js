import React from 'react'
import InterestingProjects from './projectsView'
import Success from './successView'
import Loading from '../general/loading'
import InterestingProjectActions from '../../actions/InterestingProjectActions'
import InterestingProjectsStore from '../../stores/InterestingProjectsStore'
import TrayStore from '../../stores/TrayStore'
import SelectedProjectsStore from '../../stores/SelectedProjectsStore'
import DisplayStore from '../../stores/DisplayStore'
import ValidationMessages from '../general/validationMessages'

function getStateFromStore() {
  return {
    projects: InterestingProjectsStore.getAll(),
    error: InterestingProjectsStore.getLastError(),
    loading: false,
    brokenBuildSoundEnabled: DisplayStore.areBrokenBuildSoundsEnabled()
  }
}

module.exports = React.createClass({
  displayName: 'MonitorSection',

  getInitialState() {
    return {
      projects: [],
      loading: true,
      brokenBuildSoundEnabled: false
    }
  },

  render() {
    let content

    if (this.state.error) {
      const errorMessages = [
        'Unable to fetch projects because of an error:',
        `${this.state.error.status} - ${this.state.error.message}`
      ]
      content = (
        <div className='monitor-error'>
          <ValidationMessages messages={errorMessages}/>
        </div>
      )
    } else if (this._hasProjects()) {
      content = <InterestingProjects projects={this.state.projects}/>

    } else {
      content = <Success />
    }

    return <div className='monitor' onMouseMove={this._animateMenu}>
      <Loading loading={this.state.loading}>
        {content}
      </Loading>
    </div>
  },

  componentDidMount() {
    window.addEventListener('resize', this._onChange)
    InterestingProjectsStore.addListener(this._onChange)
    DisplayStore.addListener(this._onChange)

    this._poll()
    this._hideMenu()
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._onChange)
    InterestingProjectsStore.removeListener(this._onChange)
    DisplayStore.removeListener(this._onChange)

    this._clearMenuTimeOut()
    this._showMenu()
  },

  _hasProjects() {
    return this.state.projects.length > 0
  },

  _animateMenu() {
    this._clearMenuTimeOut()
    this._showMenu()
    this.setState({
      menuTimer: setTimeout(() => {
        this._hideMenu()
      }, 3000)
    })
  },

  _showMenu() {
    Array.from(document.querySelectorAll('#menu .navigation, .content-info, .notification')).forEach((elem) => {
      elem.classList.remove('navigation-hide')
      elem.classList.add('navigation-show')
    })
  },

  _hideMenu() {
    if (this.isMounted()) {
      Array.from(document.querySelectorAll('#menu .navigation, .content-info, .notification')).forEach((elem) => {
        elem.classList.remove('navigation-show')
        elem.classList.add('navigation-hide')
      })
    }
  },

  _clearMenuTimeOut() {
    clearTimeout(this.state.menuTimer)
  },

  _onChange() {
    this.setState(getStateFromStore())
  },

  _poll() {
    if (this.isMounted()) {
      InterestingProjectActions.fetchInteresting(TrayStore.getAll(), SelectedProjectsStore.getAll()).then(() => {
        setTimeout(() => {
          this._poll()
        }, 5000)
      })
    }
  }
})
