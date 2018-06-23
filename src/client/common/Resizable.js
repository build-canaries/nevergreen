import {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import memoize from 'memoize-one'

const WAIT_MS = 16
const MAX_WAIT_MS = 32
const DEBOUNCE_OPTIONS = {leading: true, trailing: true, maxWait: MAX_WAIT_MS}

class Resizable extends Component {
  onResizeDebounced = memoize(
    (onResize) => _.debounce(onResize, WAIT_MS, DEBOUNCE_OPTIONS)
  )

  componentDidMount() {
    window.addEventListener('resize', this.onResizeDebounced(this.props.onResize))
  }

  componentDidUpdate(prevProps) {
    window.removeEventListener('resize', this.onResizeDebounced(prevProps.onResize))
    window.addEventListener('resize', this.onResizeDebounced(this.props.onResize))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeDebounced(this.props.onResize))
  }

  render() {
    return null
  }
}

Resizable.propTypes = {
  onResize: PropTypes.func.isRequired
}

export default Resizable
