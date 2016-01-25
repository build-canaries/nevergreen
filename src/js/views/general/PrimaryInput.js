const React = require('react')
const ReactDOM = require('react-dom')
const Mousetrap = require('mousetrap')

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
