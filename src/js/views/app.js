const React = require('react')
const Menu = require('./general/menu')
const Notification = require('./general/Notification')
const AppActions = require('../actions/AppActions')
const AppStore = require('../stores/AppStore')
const NotificationActions = require('../actions/NotificationActions')
const NotificationStore = require('../stores/NotificationStore')

const twentyFourHours = 24 * 60 * 60 * 1000

function getStateFromStore() {
  return {
    loaded: AppStore.isInitalised(),
    versionNumber: AppStore.versionNumber(),
    versionName: AppStore.versionName(),
    versionColour: AppStore.versionColour(),
    commitHash: AppStore.commitHash(),
    notification: NotificationStore.getNotification()
  }
}

module.exports = React.createClass({
  displayName: 'App',

  getInitialState() {
    return {
      loaded: false,
      versionNumber: 'loading...',
      versionName: 'loading...',
      versionColour: '#7E7E7E',
      commitHash: '#####',
      notification: ''
    }
  },

  componentWillMount() {
    AppStore.addListener(this._onChange)
    NotificationStore.addListener(this._onChange)
    AppActions.init()

    const versionCheckId = setInterval(NotificationActions.pollForNewVersion, twentyFourHours)
    this.setState({versionCheckId: versionCheckId})
  },

  componentWillUnmount() {
    AppStore.removeListener(this._onChange)
    NotificationStore.removeListener(this._onChange)

    clearInterval(this.state.versionCheckId)
  },

  render() {
    return (
      <div>
        <h1 className='visually-hidden'>Nevergreen</h1>

        <div id='menu'>
          <Menu versionNumber={this.state.versionNumber}
                versionName={this.state.versionName}
                versionColour={this.state.versionColour}
                commitHash={this.state.commitHash}/>
        </div>
        <Notification message={this.state.notification}/>
        {this.state.loaded ? this.props.children : ''}
      </div>
    )
  },

  _onChange() {
    this.setState(getStateFromStore())
  }
})
