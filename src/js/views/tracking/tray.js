const React = require('react')
const Container = require('../general/container')
const Projects = require('./projects')
const TraySettings = require('./traySettings')
const Loading = require('../general/loading')
const ValidationMessages = require('../general/validationMessages')
const moment = require('moment')
const Mousetrap = require('mousetrap')

module.exports = React.createClass({
  displayName: 'Tray',

  propTypes: {
    index: React.PropTypes.number.isRequired,
    tray: React.PropTypes.object.isRequired,
    removeTray: React.PropTypes.func.isRequired,
    refreshTray: React.PropTypes.func.isRequired,
    updateTray: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      showSettings: false,
      hidden: false,
      lastFetched: this._updateLastFetch()
    }
  },

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.setState({lastFetched: this._updateLastFetch()})
    }, 60000)
    this.setState({intervalId: intervalId})

    Mousetrap.bind(`r ${this.props.index}`, this.props.refreshTray)
    Mousetrap.bind(`p ${this.props.index}`, this._toggleSettingsView)
  },

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
    Mousetrap.unbind([`r ${this.props.index}`, `p ${this.props.index}`])
  },

  componentWillReceiveProps() {
    this.setState({lastFetched: this._updateLastFetch()})
  },

  render() {
    let subContent

    if (this.state.showSettings) {
      subContent =
        <TraySettings tray={this.props.tray} removeTray={this.props.removeTray} updateTray={this._updateTray}/>
    } else {
      if (this.props.tray.fetching) {
        subContent = <Loading/>
      } else if (this.props.tray.error) {
        const errorMessages = [
          'Unable to fetch projects because of an error:',
          `${this.props.tray.error.status} - ${this.props.tray.error.message}`
        ]
        subContent = <ValidationMessages messages={errorMessages}/>
      } else {
        subContent = <Projects index={this.props.index} trayId={this.props.tray.trayId}/>
      }
    }

    return (
      <Container title={this.props.tray.name || this.props.tray.url}>
        <div>
          <div className='tray-sub-bar'>
            <button className='button' onClick={this._toggleSettingsView} title='Toggle settings'>
              <span className={'icon-' + (this.state.showSettings ? 'list' : 'cog') }/>
              <span className='text-with-icon'>{this._toggleSettingsLabel()}</span>
            </button>
            <button className='button' onClick={this.props.refreshTray}>
              <span className='icon-loop2'/>
              <span className='text-with-icon'>Refresh tray</span>
            </button>
            <span className='tray-refresh-last-fetch'>last refreshed {this.state.lastFetched} ago</span>
          </div>
          <div>
            {subContent}
          </div>
        </div>
      </Container>
    )
  },

  _toggleSettingsLabel() {
      return this.state.showSettings ? 'Show projects' : 'Show settings'
  },

  _toggleSettingsView() {
    this.setState({
      showSettings: !this.state.showSettings
    })
  },

  _updateLastFetch() {
    if (this.props.tray.timestamp) {
      return moment(this.props.tray.timestamp).fromNow(true)
    }
  },

  _updateTray(trayId, name, url, username, password) {
    this.setState({
      showSettings: false
    })
    this.props.updateTray(trayId, name, url, username, password)
  }
})
