import React from 'react'
import ReactDOM from 'react-dom'
import Mousetrap from 'mousetrap'

module.exports = React.createClass({
  displayName: 'PrimaryInput',

  componentDidMount() {
    Mousetrap.bind('a', this._focus)
  },

  componentWillUnmount() {
    Mousetrap.unbind(['a'])
  },

  render() {
    return this.props.children
  },

  _focus() {
    ReactDOM.findDOMNode(this).focus()
    return false
  }
})
