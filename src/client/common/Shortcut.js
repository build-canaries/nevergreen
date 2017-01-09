import React, {Component, PropTypes} from 'react'
import Mousetrap from 'mousetrap'
import _ from 'lodash'

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
    if (!_.isEqual(this.props.hotkeys, nextProps.hotkeys)) {
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
