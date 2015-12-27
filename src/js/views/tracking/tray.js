const React = require('react')
const Projects = require('./projects')
const TraySettings = require('./traySettings')
const Loading = require('../general/loading')
const Error = require('../general/errorView')

module.exports = React.createClass({
  displayName: 'Tray',

  propTypes: {
    tray: React.PropTypes.object.isRequired,
    removeTray: React.PropTypes.func.isRequired,
    refreshTray: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      showSettings: false,
      hidden: false
    }
  },

  render() {
    let content

    if (this.state.showSettings) {
      content = <TraySettings tray={this.props.tray} removeTray={this.props.removeTray}/>
    } else {
      let subContent

      if (this.props.tray.fetching) {
        subContent = <Loading/>
      } else if (this.props.tray.error) {
        subContent = <Error status={this.props.tray.error.status} reason={this.props.tray.error.message}/>
      } else {
        subContent = <Projects trayId={this.props.tray.trayId}/>
      }

      content = (
        <div>
          <div className='tray-refresh'>
            <button className='button' onClick={this.props.refreshTray}>
              <span className='icon-loop2'></span>
              <span className='text-with-icon'>Refresh</span>
            </button>
            <span className='tray-refresh-last-fetch'>Last Fetch: {this.props.tray.timestamp}</span>
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
          <button className='tray-hidden-button' onClick={this.toggleHidden} title={hideText}>
            <span className={'icon-' + (this.state.hidden ? 'circle-down' : 'circle-up') }></span>
            <span className='visually-hidden'>{hideText}</span>
          </button>
          <h3 className='tray-title'>{this.props.tray.url}</h3>
          <button className='tray-settings-button' onClick={this.toggleSettingsView} title={settingsText}>
            <span className={'icon-' + (this.state.showSettings ? 'list' : 'cog') }></span>
            <span className='visually-hidden'>{settingsText}</span>
          </button>
        </div>
        {this.state.hidden ? '' : content}
      </section>
    )
  },

  toggleSettingsView() {
    this.setState({
      showSettings: !this.state.showSettings
    })
  },

  toggleHidden() {
    this.setState({
      hidden: !this.state.hidden
    })
  }
})
