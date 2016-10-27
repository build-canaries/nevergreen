import React, {Component, PropTypes} from 'react'
import InterestingProjects from './InterestingProjects'
import Success from './Success'
import Loading from '../common/loading/Loading'
import Messages from '../common/messages/Messages'
import './monitor.scss'
import Timer from '../common/Timer'

const THREE_SECONDS = 3 * 1000
const FIVE_SECONDS = 5 * 1000

function showMenu(state) {
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
    this.state = {}
  }

  componentDidMount() {
    hideMenu()

    const resizeListener = () => this.forceUpdate()
    this.setState({resizeListener})
    window.addEventListener('resize', resizeListener)
  }

  componentWillUnmount() {
    showMenu(this.state)
    window.removeEventListener('resize', this.state.resizeListener)
  }

  render() {
    const fetch = () => this.props.fetchInteresting(this.props.trays, this.props.selected)

    const animateMenu = () => {
      showMenu(this.state)
      this.setState({menuTimer: setTimeout(() => hideMenu(), THREE_SECONDS)})
    }

    let content

    if (this.props.errors) {
      content = <Messages type='notification' messages={this.props.errors}/>
    } else if (this.props.projects.length > 0) {
      content = <InterestingProjects {...this.props}/>
    } else {
      content = <Success messages={this.props.messages}/>
    }

    return (
      <div className='monitor' onMouseMove={animateMenu}>
        <Timer onTrigger={fetch} interval={FIVE_SECONDS}/>
        <Loading loaded={this.props.loaded}>
          {content}
        </Loading>
      </div>
    )
  }
}

Monitor.propTypes = {
  loaded: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  trays: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.object.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  showBrokenBuildTimers: PropTypes.bool,
  showTrayNameEnabled: PropTypes.bool,
  playBrokenBuildSounds: PropTypes.bool,
  brokenBuildFx: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchInteresting: PropTypes.func.isRequired
}

export default Monitor
