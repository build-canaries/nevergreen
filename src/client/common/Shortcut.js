import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import Mousetrap from 'mousetrap'
import UiMessageStore from '../stores/UiMessageStore'
import './shortcut.scss'

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

function click(component) {
  const parent = ReactDOM.findDOMNode(component).parentNode
  parent.focus()
  parent.click()
  return false
}

class Shortcut extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showKeyboardShortcuts: false
    }
  }

  componentDidMount() {
    const callback = () => this.setState(getStateFromStore())
    UiMessageStore.addListener(callback)
    Mousetrap.bind(this.props.hotkeys, () => click(this))
    this.setState({callback})
  }

  componentWillUnmount() {
    UiMessageStore.removeListener(this.state.callback)
    Mousetrap.unbind(this.props.hotkeys)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.hotkeys !== nextProps.hotkeys) {
      Mousetrap.unbind(this.props.hotkeys)
      Mousetrap.bind(nextProps.hotkeys, () => click(this))
    }
  }

  render() {
    const hotkeyClass = this.state.showKeyboardShortcuts ? 'hotkey' : 'hidden'

    const keys = this.props.hotkeys.map((keySeq, index) => {
      return <span key={keySeq}>{index > 0 ? renderOr() : null}{renderKeys(keySeq)}</span>
    })

    return <span className={hotkeyClass}>{keys}</span>
  }
}

Shortcut.propTypes = {
  hotkeys: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Shortcut
