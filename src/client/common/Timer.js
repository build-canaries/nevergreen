import {Component, PropTypes} from 'react'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const run = () => {
      this.props.onTrigger()
      const id = setTimeout(run, this.props.interval)
      this.setState({id})
    }
    run()
  }

  componentWillUnmount() {
    clearTimeout(this.state.id)
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
