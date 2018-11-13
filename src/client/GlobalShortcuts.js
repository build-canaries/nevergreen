import {Component} from 'react'
import PropTypes from 'prop-types'
import Mousetrap from 'mousetrap'
import 'mousetrap/plugins/global-bind/mousetrap-global-bind'

function blurActive() {
  const active = document.activeElement
  if (active) {
    active.blur()
  }
}

export class GlobalShortcuts extends Component {

  componentDidMount() {
    const {keyboardShortcut, history} = this.props

    Mousetrap.bindGlobal('esc', blurActive)
    Mousetrap.bind('?', () => {
      keyboardShortcut(true)
      history.push('help')
    })
  }

  componentWillUnmount() {
    Mousetrap.unbind(['?', 'esc'])
  }

  render() {
    return null
  }
}

GlobalShortcuts.propTypes = {
  keyboardShortcut: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default GlobalShortcuts
