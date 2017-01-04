import React, {Component, PropTypes} from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import Mousetrap from 'mousetrap'
import 'mousetrap/plugins/global-bind/mousetrap-global-bind'
import _ from 'lodash'
import './nevergreen.scss'
import Timer from './common/Timer'

const THREE_SECONDS = 3 * 1000
const TWENTY_FOUR_HOURS = 24 * 60 * 60

class Nevergreen extends Component {
  componentDidMount() {
    this.props.initalise()

    Mousetrap.bindGlobal('esc', () => document.activeElement.blur())
    Mousetrap.bind('?', () => {
      this.props.keyboardShortcut(true)
      setTimeout(() => this.props.keyboardShortcut(false), THREE_SECONDS)
    })
  }

  componentWillUnmount() {
    Mousetrap.unbind(['?', 'esc'])
  }

  render() {
    const checkVersion = () => this.props.checkForNewVersion(this.props.versionNumber)

    const notification = !_.isEmpty(_.trim(this.props.notification)) ?
      <div className='pop-up-notification'>
        <div>
          <span className='icon-notification'/>
          <span className='text-with-icon'>Notification</span>
          <span className='icon-cross pop-up-notification-dismiss' onClick={this.props.dismiss}/>
        </div>
        {this.props.notification}
      </div> : null

    return (
      <main className='nevergreen'>
        <Timer onTrigger={checkVersion} interval={TWENTY_FOUR_HOURS}/>
        <Header/>
        {notification}
        {this.props.loaded ? this.props.children : null}
        <Footer versionNumber={this.props.versionNumber} versionName={this.props.versionName} versionColour={this.props.versionColour}
                commitHash={this.props.commitHash}/>
      </main>
    )
  }
}

Nevergreen.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  loaded: PropTypes.bool.isRequired,
  versionNumber: PropTypes.string.isRequired,
  versionName: PropTypes.string.isRequired,
  versionColour: PropTypes.string.isRequired,
  commitHash: PropTypes.string.isRequired,
  notification: PropTypes.string,
  initalise: PropTypes.func.isRequired,
  keyboardShortcut: PropTypes.func.isRequired,
  checkForNewVersion: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired
}

export default Nevergreen
