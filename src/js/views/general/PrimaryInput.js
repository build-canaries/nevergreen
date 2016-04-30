import {Component} from 'react'
import ReactDOM from 'react-dom'
import Mousetrap from 'mousetrap'

class PrimaryInput extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    Mousetrap.bind('a', this._focus.bind(this))
  }

  componentWillUnmount() {
    Mousetrap.unbind(['a'])
  }

  render() {
    return this.props.children
  }

  _focus() {
    ReactDOM.findDOMNode(this).focus()
    return false
  }
}

export default PrimaryInput
