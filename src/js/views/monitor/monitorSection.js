import React, {Component} from 'react'
import InterestingProjects from './projectsView'
import Success from './successView'
import Loading from '../../common/Loading'
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

class MonitorSection extends Component {
  static _showMenu() {
    Array.from(document.querySelectorAll('#menu .navigation, .content-info, .notification')).forEach((elem) => {
      elem.classList.remove('navigation-hide')
      elem.classList.add('navigation-show')
    })
  }

  static _hideMenu() {
    Array.from(document.querySelectorAll('#menu .navigation, .content-info, .notification')).forEach((elem) => {
      elem.classList.remove('navigation-show')
      elem.classList.add('navigation-hide')
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      menuTimer: null,
      projects: [],
      loading: true,
      brokenBuildSoundEnabled: false
    }
  }

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
    } else if (this.state.projects.length > 0) {
      content = <InterestingProjects projects={this.state.projects}/>

    } else {
      content = <Success />
    }

    return <div className='monitor' onMouseMove={this._animateMenu.bind(this)}>
      <Loading loading={this.state.loading}>
        {content}
      </Loading>
    </div>
  }

  componentDidMount() {
    const callback = () => this.setState(getStateFromStore())
    this.setState({callback})

    window.addEventListener('resize', callback)
    InterestingProjectsStore.addListener(callback)
    DisplayStore.addListener(callback)

    this._poll()
    MonitorSection._hideMenu()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.callback)
    InterestingProjectsStore.removeListener(this.state.callback)
    DisplayStore.removeListener(this.state.callback)

    this._clearMenuTimeOut()
    clearTimeout(this.state.timer)
    MonitorSection._showMenu()
  }

  _animateMenu() {
    this._clearMenuTimeOut()
    MonitorSection._showMenu()
    this.setState({
      menuTimer: setTimeout(() => {
        MonitorSection._hideMenu()
      }, 3000)
    })
  }

  _clearMenuTimeOut() {
    clearTimeout(this.state.menuTimer)
  }

  _poll() {
    InterestingProjectActions.fetchInteresting(TrayStore.getAll(), SelectedProjectsStore.getAll()).then(() => {
      this.setState({
        timer: setTimeout(() => {
          this._poll()
        }, 5000)
      })
    })
  }
}

export default MonitorSection
