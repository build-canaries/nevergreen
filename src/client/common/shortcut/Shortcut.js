import React, {Component, PropTypes} from 'react'
import Mousetrap from 'mousetrap'
import './shortcut.scss'

function renderKeys(keys) {
  return keys.split(' ').map((key) => {
    return <kbd key={key}>{key}</kbd>
  })
}

function click(parent) {
  parent.focus()
  parent.click()
  return false
}

class Shortcut extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    Mousetrap.bind(this.props.hotkeys, () => click(this.node.parent))
  }

  componentWillUnmount() {
    Mousetrap.unbind(this.props.hotkeys)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.hotkeys !== nextProps.hotkeys) {
      Mousetrap.unbind(this.props.hotkeys)
      Mousetrap.bind(nextProps.hotkeys, () => click(this.node.parent))
    }
  }

  render() {
    const hotkeyClass = this.props.show ? 'hotkey' : 'hidden'
    const or = <span className='hotkey-or'>or</span>

    const keys = this.props.hotkeys.map((keySeq, index) => {
      return <span key={keySeq}>{index > 0 ? or : null}{renderKeys(keySeq)}</span>
    })

    return <span className={hotkeyClass} ref={(node) => this.node = node}>{keys}</span>
  }
}

Shortcut.propTypes = {
  hotkeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  show: PropTypes.bool
}

export default Shortcut
