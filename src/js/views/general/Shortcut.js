import React from 'react'
import ReactDOM from 'react-dom'
import Mousetrap from 'mousetrap'
import UiMessageStore from '../../stores/UiMessageStore'

function getStateFromStore() {
  return {
    showKeyboardShortcuts: UiMessageStore.showKeyboardShortcuts()
  }
}

function renderKeys(keys) {
  return keys.split(' ').map((key) => {
    return <kbd key={key}>{key}</kbd>
  })
}

function renderOr() {
  return <span className='hotkey-or'>or</span>
}

module.exports = React.createClass({
  displayName: 'Shortcut',

  propTypes: {
    hotkeys: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  },

  getInitialState() {
    return {
      showKeyboardShortcuts: false
    }
  },

  componentDidMount() {
    UiMessageStore.addListener(this._onChange)
    Mousetrap.bind(this.props.hotkeys, this._click)
  },

  componentWillUnmount() {
    UiMessageStore.removeListener(this._onChange)
    Mousetrap.unbind(this.props.hotkeys)
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.hotkeys !== nextProps.hotkeys) {
      Mousetrap.unbind(this.props.hotkeys)
      Mousetrap.bind(nextProps.hotkeys, this._click)
    }
  },

  render() {
    const hotkeyClass = this.state.showKeyboardShortcuts ? 'hotkey' : 'hidden'

    const keys = this.props.hotkeys.map((keySeq, index) => {
      return <span key={keySeq}>{index > 0 ? renderOr(): ''}{renderKeys(keySeq)}</span>
    })

    return <span className={hotkeyClass}>{keys}</span>
  },

  _click() {
    const parent = ReactDOM.findDOMNode(this).parentNode
    parent.focus()
    parent.click()
    return false
  },

  _onChange() {
    this.setState(getStateFromStore())
  }
})
