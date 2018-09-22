import {Component} from 'react'
import PropTypes from 'prop-types'
import {debug} from './Logger'

function asMilliseconds(seconds) {
  return seconds * 1000
}

class Timer extends Component {
  constructor(props) {
    super(props)
    this.mounted = true
  }

  createTimeout = () => {
    this.timeoutId = setTimeout(this.run, asMilliseconds(this.props.interval))
    debug(`created timeout [${this.timeoutId}] to run in [${this.props.interval}s]`)
  }

  checkMounted = () => {
    if (this.mounted) {
      this.createTimeout()
    } else {
      debug('Timer unmounted so not rescheduling')
    }
  }

  run = async () => {
    await this.props.onTrigger()
    this.checkMounted()
  }

  componentDidMount() {
    this.run()
  }

  componentWillUnmount() {
    debug(`clearing timeout [${this.timeoutId}]`)
    clearTimeout(this.timeoutId)
    this.mounted = false
  }

  render() {
    return null
  }
}

Timer.propTypes = {
  onTrigger: PropTypes.func.isRequired,
  interval: PropTypes.number.isRequired
}

export default Timer
