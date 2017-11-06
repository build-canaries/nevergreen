import {Component} from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

const WAIT_MS = 16
const MAX_WAIT_MS = 32
const DEBOUNCE_OPTIONS = {leading: true, trailing: true, maxWait: MAX_WAIT_MS}

class Resizable extends Component {
  constructor(props) {
    super(props)
    this.state = {onResizeDebounced: debounce(props.onResize, WAIT_MS, DEBOUNCE_OPTIONS)}
  }

  componentDidMount() {
    window.addEventListener('resize', this.state.onResizeDebounced)
  }

  componentWillReceiveProps(nextProps) {
    window.removeEventListener('resize', this.state.onResizeDebounced)
    this.setState({onResizeDebounced: debounce(nextProps.onResize, WAIT_MS, DEBOUNCE_OPTIONS)})
  }

  componentDidUpdate() {
    window.addEventListener('resize', this.state.onResizeDebounced)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.onResizeDebounced)
  }

  render() {
    return null
  }
}

Resizable.propTypes = {
  onResize: PropTypes.func.isRequired
}

export default Resizable
