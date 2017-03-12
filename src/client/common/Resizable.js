import {Component, PropTypes} from 'react'

class Resizable extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.props.onResize)
  }

  componentWillReceiveProps(nextProps) {
    window.removeEventListener('resize', this.props.onResize)
    window.addEventListener('resize', nextProps.onResize)
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
