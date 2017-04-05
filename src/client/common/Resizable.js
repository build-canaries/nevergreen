import {Component, PropTypes} from 'react'

class Resizable extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.props.onResize)
  }

  componentDidUpdate(prevProps) {
    window.removeEventListener('resize', prevProps.onResize)
    window.addEventListener('resize', this.props.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.onResize)
  }

  render() {
    return null
  }
}

Resizable.propTypes = {
  onResize: PropTypes.func.isRequired
}

export default Resizable
