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
  setParentNode = (node) => {
    this.parentNode = _.isNil(node) ? null : node
  }

  componentDidMount() {
    Mousetrap.bind(this.props.hotkeys, () => click(this.parentNode))
  }

  componentWillUnmount() {
    Mousetrap.unbind(this.props.hotkeys)
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.hotkeys, nextProps.hotkeys)) {
      Mousetrap.unbind(this.props.hotkeys)
      Mousetrap.bind(nextProps.hotkeys, () => click(this.parentNode))
    }
  }

  render() {
    return <span ref={this.setParentNode}/>
  }
}

Shortcut.propTypes = {
  hotkeys: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Shortcut
