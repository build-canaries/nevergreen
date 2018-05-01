import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Mousetrap from 'mousetrap'
import _ from 'lodash'

function click(parent) {
  if (parent) {
    parent.focus()
    parent.click()
  }
  return false
}

class Shortcut extends Component {
  componentDidMount() {
    Mousetrap.bind(this.props.hotkeys, () => click(this.parentNode))
  }

  componentWillUnmount() {
    Mousetrap.unbind(this.props.hotkeys)
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.hotkeys, prevProps.hotkeys)) {
      Mousetrap.unbind(prevProps.hotkeys)
      Mousetrap.bind(this.props.hotkeys, () => click(this.parentNode))
    }
  }

  render() {
    return <span ref={(node) => this.parentNode = node}/>
  }
}

Shortcut.propTypes = {
  hotkeys: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Shortcut
