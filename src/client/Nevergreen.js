import React, {Component, PropTypes} from 'react'
import Menu from './navigation/Navigation'
import Mousetrap from 'mousetrap'
import 'mousetrap/plugins/global-bind/mousetrap-global-bind'
import _ from 'lodash'
import './nevergreen.scss'

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000

class Nevergreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.initalise()

    this.setState({versionCheckId: setInterval(this.props.checkForNewVersion, TWENTY_FOUR_HOURS)})

    Mousetrap.bindGlobal('esc', () => document.activeElement.blur())
    Mousetrap.bind('?', () => this.props.showKeyboardShortcuts())
  }

  componentWillUnmount() {
    clearInterval(this.state.versionCheckId)

    Mousetrap.unbind('?')
  }

  render() {
    const notification = _.size(this.props.notification) > 0 ?
      <div className='pop-up-notification'>
        <div>
          <span className='icon-notification'/>
          <span className='text-with-icon'>Notification</span>
          <span className='icon-cross pop-up-notification-dismiss' onClick={this.props.dismiss}/>
        </div>
        {this.props.notification}
      </div> : null

    return (
      <div className='nevergreen'>
        <h1 className='visually-hidden'>Nevergreen</h1>
        <Menu versionNumber={this.props.versionNumber}
              versionName={this.props.versionName}
              versionColour={this.props.versionColour}
              commitHash={this.props.commitHash}/>
        {notification}
        {this.props.loaded ? this.props.children : null}
      </div>
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
  showKeyboardShortcuts: PropTypes.func.isRequired,
  checkForNewVersion: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired
}

export default Nevergreen
