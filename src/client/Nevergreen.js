import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Header from './header/Header'
import Footer from './footer/Footer'
import Mousetrap from 'mousetrap'
import 'mousetrap/plugins/global-bind/mousetrap-global-bind'
import _ from 'lodash'
import styles from './nevergreen.scss'
import Timer from './common/Timer'
import Notification from './Notification'
import version from '../../resources/version.txt'
import {registerServiceWorker} from './ServiceWorker'

const ONE_SECONDS = 1000
const THREE_SECONDS = 3 * 1000
const TWENTY_FOUR_HOURS = 24 * 60 * 60

function blurActive() {
  const active = document.activeElement
  if (active) {
    active.blur()
  }
}

class Nevergreen extends Component {
  constructor(props) {
    super(props)
    this.state = {fullScreenTimer: null}
    this.disableFullScreen = _.throttle(this.disableFullScreen, ONE_SECONDS, {trailing: false}).bind(this)
  }

  checkVersion = () => {
    this.props.checkForNewVersion(version, window.location.hostname)
  }

  componentDidMount() {
    this.props.initalise()

    Mousetrap.bindGlobal('esc', blurActive)
    Mousetrap.bind('?', () => {
      this.props.keyboardShortcut(true)
      this.props.history.push('help')
    })

    registerServiceWorker()
  }

  componentWillUnmount() {
    Mousetrap.unbind(['?', 'esc'])
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullScreenRequested !== this.props.fullScreenRequested) {
      this.props.enableFullScreen(nextProps.fullScreenRequested)
    }
  }

  render() {
    return (
      <main className={styles.nevergreen} onMouseMove={this.disableFullScreen}>
        <Timer onTrigger={this.checkVersion} interval={TWENTY_FOUR_HOURS}/>
        <Header fullScreen={this.props.isFullScreen}/>
        <Notification notification={this.props.notification}
                      dismiss={this.props.dismiss}
                      fullScreen={this.props.isFullScreen}/>
        {this.props.loaded && this.props.children}
        <Footer fullScreen={this.props.isFullScreen}/>
      </main>
    )
  }

  disableFullScreen() {
    clearTimeout(this.state.fullScreenTimer)
    if (this.props.isFullScreen) {
      this.props.enableFullScreen(false)
    }
    if (this.props.fullScreenRequested) {
      this.setState({
        fullScreenTimer: setTimeout(() => this.props.enableFullScreen(true), THREE_SECONDS)
      })
    }
  }
}

Nevergreen.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  loaded: PropTypes.bool.isRequired,
  notification: PropTypes.string,
  initalise: PropTypes.func.isRequired,
  keyboardShortcut: PropTypes.func.isRequired,
  checkForNewVersion: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  isFullScreen: PropTypes.bool,
  fullScreenRequested: PropTypes.bool,
  enableFullScreen: PropTypes.func.isRequired
}

export default Nevergreen
