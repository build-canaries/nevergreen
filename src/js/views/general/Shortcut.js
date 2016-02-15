const React = require('react')
const ReactDOM = require('react-dom')
const Mousetrap = require('mousetrap')

module.exports = React.createClass({
  displayName: 'Shortcut',

  propTypes: {
    hotkeys: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  },

  componentDidMount() {
    Mousetrap.bind(this.props.hotkeys, this._click)
  },

  componentWillUnmount() {
    Mousetrap.unbind(this.props.hotkeys)
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.hotkeys !== nextProps.hotkeys) {
      Mousetrap.unbind(this.props.hotkeys)
      Mousetrap.bind(nextProps.hotkeys, this._click)
    }
  },

  render() {
    return this.props.children
  },

  _click() {
    const node = ReactDOM.findDOMNode(this)
    node.focus()
    node.click()
    return false
  }
})
