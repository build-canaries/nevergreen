import {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import Mousetrap from 'mousetrap'

class PrimaryInput extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const focus = () => {
      ReactDOM.findDOMNode(this).focus()
      return false
    }
    Mousetrap.bind('a', focus)
  }

  componentWillUnmount() {
    Mousetrap.unbind(['a'])
  }

  render() {
    return this.props.children
  }
}

PrimaryInput.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
}

export default PrimaryInput
