import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {registerServiceWorker} from './ServiceWorker'
import {Header} from './header/Header'
import {Footer} from './footer/Footer'
import {Timer} from './common/Timer'
import NotificationContainer from './notification/NotificationContainer'
import version from '../../resources/version.txt'
import styles from './nevergreen.scss'
import KeyboardShortcuts from './KeyboardShortcuts'

const ONE_SECONDS = 1000
const THREE_SECONDS = 3 * 1000
const TWENTY_FOUR_HOURS = 24 * 60 * 60

export class Nevergreen extends Component {

  constructor(props) {
    super(props)
    this.state = {fullScreenTimer: null}
    this.disableFullScreen = _.throttle(this.disableFullScreen, ONE_SECONDS, {trailing: false}).bind(this)
  }

  checkVersion = () => {
    this.props.checkForNewVersion(version, window.location.hostname)
  }

  componentDidMount() {
    const {initalise, notify} = this.props

    initalise()
    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker(notify)
    }
  }

  componentDidUpdate(prevProps) {
    const {fullScreenRequested, enableFullScreen} = this.props

    if (prevProps.fullScreenRequested !== fullScreenRequested) {
      enableFullScreen(fullScreenRequested)
      if (!fullScreenRequested) {
        clearTimeout(this.state.fullScreenTimer)
      }
    }
  }

  render() {
    const {loaded, isFullScreen, children, clickToShowMenu} = this.props

    const disableFullScreenOn = clickToShowMenu
      ? {onClick: this.disableFullScreen}
      : {onMouseMove: this.disableFullScreen}

    return (
      <Fragment>
        {loaded && <KeyboardShortcuts/>}
        {loaded && <Timer onTrigger={this.checkVersion} interval={TWENTY_FOUR_HOURS}/>}

        <div className={styles.nevergreen}
             aria-busy={!loaded}
             tabIndex='-1'
             {...disableFullScreenOn}>
          <Header fullScreen={isFullScreen}/>
          <NotificationContainer/>
          {loaded && <main className={styles.main}>{children}</main>}
          <Footer fullScreen={isFullScreen}/>
        </div>
      </Fragment>
    )
  }

  disableFullScreen() {
    const {isFullScreen, enableFullScreen, fullScreenRequested} = this.props

    clearTimeout(this.state.fullScreenTimer)

    if (isFullScreen) {
      enableFullScreen(false)
    }

    if (fullScreenRequested) {
      const doEnableFullScreen = () => {
        enableFullScreen(true)
      }
      const fullScreenTimer = setTimeout(doEnableFullScreen, THREE_SECONDS)
      this.setState({fullScreenTimer})
    }
  }
}

Nevergreen.propTypes = {
  children: PropTypes.node.isRequired,
  loaded: PropTypes.bool.isRequired,
  initalise: PropTypes.func.isRequired,
  checkForNewVersion: PropTypes.func.isRequired,
  isFullScreen: PropTypes.bool,
  fullScreenRequested: PropTypes.bool,
  enableFullScreen: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
  clickToShowMenu: PropTypes.bool
}

export default Nevergreen
