import React, {Component, PropTypes} from 'react'
import InterestingProjects from './InterestingProjects'
import Success from './Success'
import Loading from '../common/Loading'
import Messages from '../common/messages/Messages'
import './monitor.scss'

function animateMenu(state) {
  clearTimeout(state.menuTimer)

  Array.from(document.querySelectorAll('.navigation, .pop-up-notification, .monitor')).forEach((elem) => {
    elem.classList.remove('navigation-hide')
    elem.classList.add('navigation-show')
  })
}

function hideMenu() {
  Array.from(document.querySelectorAll('.navigation, .pop-up-notification, .monitor')).forEach((elem) => {
    elem.classList.remove('navigation-show')
    elem.classList.add('navigation-hide')
  })
}

class Monitor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pollingTimer: null,
      menuTimer: null,
      resizeListener: null
    }
  }

  componentDidMount() {
    const poll = () => {
      return this.props.fetchInteresting(this.props.trays, this.props.selected).then(() => {
        clearTimeout(this.state.pollingTimer)
        const pollingTimer = setTimeout(() => poll(), 5000)
        this.setState({pollingTimer})
      })
    }

    poll()
    hideMenu()

    const resizeListener = () => this.forceUpdate()
    this.setState({resizeListener})
    window.addEventListener('resize', resizeListener)
  }

  componentWillUnmount() {
    animateMenu(this.state)
    clearTimeout(this.state.pollingTimer)
    window.removeEventListener('resize', this.state.resizeListener)
  }

  render() {
    const showMenu = () => {
      animateMenu(this.state)
      this.setState({menuTimer: setTimeout(() => hideMenu(), 3000)})
    }

    let content

    if (this.props.errors) {
      content = <Messages type='notification' messages={this.props.errors}/>
    } else if (this.props.projects.length > 0) {
      content = <InterestingProjects {...this.props}/>
    } else {
      content = <Success messages={this.props.messages}/>
    }

    return <div className='monitor' onMouseMove={showMenu}>
      <Loading loaded={this.props.loaded}>
        {content}
      </Loading>
    </div>
  }
}

Monitor.propTypes = {
  loaded: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  trays: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.object.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  showBrokenBuildTimers: PropTypes.bool,
  showTrayName: PropTypes.bool,
  playBrokenBuildSounds: PropTypes.bool,
  brokenBuildFx: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchInteresting: PropTypes.func.isRequired
}

export default Monitor
