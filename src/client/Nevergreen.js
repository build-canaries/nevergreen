import React, {Component, PropTypes} from 'react'
import Menu from './navigation/Navigation'
import Mousetrap from 'mousetrap'
import 'mousetrap/plugins/global-bind/mousetrap-global-bind'
import _ from 'lodash'
import './nevergreen.scss'

const twentyFourHours = 24 * 60 * 60 * 1000

class Nevergreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.init()

    const versionCheckId = setInterval(this.props.checkForNewVersion, twentyFourHours)
    this.setState({versionCheckId})

    Mousetrap.bindGlobal('esc', () => {
      document.activeElement.blur()
    })

    Mousetrap.bind('?', () => {
      this.props.showKeyboardShortcuts()
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.versionCheckId)

    Mousetrap.unbind('?')
  }

  render() {
    const classes = 'pop-up-notification' + (_.size(this.props.message) > 0 ? '' : ' hidden')

    return (
      <div className='nevergreen'>
        <h1 className='visually-hidden'>Nevergreen</h1>
        <Menu versionNumber={this.props.versionNumber}
              versionName={this.props.versionName}
              versionColour={this.props.versionColour}
              commitHash={this.props.commitHash}/>
        <div className={classes}>
          <div>
            <span className='icon-notification'/>
            <span className='text-with-icon'>Notification</span>
            <span className='icon-cross pop-up-notification-dismiss' onClick={this.props.dismiss}/>
          </div>
          {this.props.notification}
        </div>
        {this.props.loaded ? this.props.children : null}
      </div>
    )
  }
}

Nevergreen.propTypes = {
  loaded: PropTypes.bool.isRequired,
  versionNumber: PropTypes.string.isRequired,
  versionName: PropTypes.string.isRequired,
  versionColour: PropTypes.string.isRequired,
  commitHash: PropTypes.string.isRequired,
  notification: PropTypes.string,
  init: PropTypes.func.isRequired,
  showKeyboardShortcuts: PropTypes.func.isRequired,
  checkForNewVersion: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired
}

export default Nevergreen
