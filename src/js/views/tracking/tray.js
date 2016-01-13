const React = require('react')
const Projects = require('./projects')
const TraySettings = require('./traySettings')
const Loading = require('../general/loading')
const ValidationMessages = require('../general/validationMessages')
const moment = require('moment')

module.exports = React.createClass({
  displayName: 'Tray',

  propTypes: {
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
  },

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  },

  componentWillReceiveProps() {
    this.setState({lastFetched: this._updateLastFetch()})
  },

  render() {
    let content

    if (this.state.showSettings) {
      content =
        <TraySettings tray={this.props.tray} removeTray={this.props.removeTray} updateTray={this.props.updateTray}/>
    } else {
      let subContent

      if (this.props.tray.fetching) {
        subContent = <Loading/>
      } else if (this.props.tray.error) {
        const errorMessages = [
          'Unable to fetch projects because of an error:',
          `${this.props.tray.error.status} - ${this.props.tray.error.message}`
        ]
        subContent = <ValidationMessages messages={errorMessages}/>
      } else {
        subContent = <Projects trayId={this.props.tray.trayId}/>
      }

      content = (
        <div>
          <div className='tray-refresh'>
            <button className='button' onClick={this.props.refreshTray}>
              <span className='icon-loop2'/>
              <span className='text-with-icon'>Refresh tray</span>
            </button>
            <span className='tray-refresh-last-fetch'>last refreshed {this.state.lastFetched} ago</span>
          </div>
          {subContent}
        </div>
      )
    }

    const hideText = this.state.hidden ? 'expand tray' : 'collapse tray'
    const settingsText = this.state.showSettings ? 'show projects' : 'show settings'

    return (
      <section className='tray'>
        <div className='tray-title-container'>
          <button className='tray-hidden-button' onClick={this._toggleHidden} title={hideText}>
            <span className={'icon-' + (this.state.hidden ? 'circle-down' : 'circle-up') }/>
            <span className='visually-hidden'>{hideText}</span>
          </button>
          <h3 className='tray-title'>{this.props.tray.url}</h3>
          <button className='tray-settings-button' onClick={this._toggleSettingsView} title={settingsText}>
            <span className={'icon-' + (this.state.showSettings ? 'list' : 'cog') }/>
            <span className='visually-hidden'>{settingsText}</span>
          </button>
        </div>
        {this.state.hidden ? '' : content}
      </section>
    )
  },

  _toggleSettingsView() {
    this.setState({
      showSettings: !this.state.showSettings
    })
  },

  _toggleHidden() {
    this.setState({
      hidden: !this.state.hidden
    })
  },

  _updateLastFetch() {
    if (this.props.tray.timestamp) {
      return moment(this.props.tray.timestamp).fromNow(true)
    }
  }
})
