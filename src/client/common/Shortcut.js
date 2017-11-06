import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Mousetrap from 'mousetrap'
import isEqual from 'lodash/isEqual'

function click(parent) {
  parent.focus()
  parent.click()
  return false
}

class Shortcut extends Component {
  componentDidMount() {
    Mousetrap.bind(this.props.hotkeys, () => click(this.node.parentNode))
  }

  componentWillUnmount() {
    Mousetrap.unbind(this.props.hotkeys)
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.hotkeys, nextProps.hotkeys)) {
      Mousetrap.unbind(this.props.hotkeys)
      Mousetrap.bind(nextProps.hotkeys, () => click(this.node.parentNode))
    }
  }

  render() {
    return <span ref={(node) => this.node = node}/>
  }
}

Shortcut.propTypes = {
  hotkeys: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Shortcut
