var React = require('react')
var _ = require('lodash')
var trackingRepository = require('../../storage/trackingRepository')
var Projects = require('./projects').Projects
var TraySettings = require('./traySettings').TraySettings

module.exports = {
    Tray: React.createClass({
        propTypes: {
            trayId: React.PropTypes.string.isRequired,
            removeTray: React.PropTypes.func.isRequired
        },

        getInitialState: function () {
            return {
                showSettings: false,
                tray: trackingRepository.getTray(this.props.trayId),
                hidden: false
            }
        },

        render: function () {
            var content

            if (this.state.showSettings) {
                content = <TraySettings trayId={this.props.trayId} removeTray={this.props.removeTray}/>
            } else {
                content = <Projects tray={this.state.tray} updateTray={this.updateTray}/>
            }

            var hideText = this.state.hidden ? 'expand tray' : 'collapse tray'
            var settingsText = this.state.showSettings ? 'show projects' : 'show settings'

            return (
                <section className='tray'>
                    <div className='tray-title-container'>
                        <button className='tray-hidden-button' onClick={this.toggleHidden} title={hideText}>
                            <span className={'icon-' + (this.state.hidden ? 'circle-down' : 'circle-up') }></span>
                            <span className='visually-hidden'>{hideText}</span>
                        </button>
                        <h3 className='tray-title'>{this.state.tray.url}</h3>
                        <button className='tray-settings-button' onClick={this.toggleSettingsView} title={settingsText}>
                            <span className={'icon-' + (this.state.showSettings ? 'list' : 'cog') }></span>
                            <span className='visually-hidden'>{settingsText}</span>
                        </button>
                    </div>
                    {this.state.hidden ? '' : content}
                </section>
            )
        },

        toggleSettingsView: function () {
            this.setState({showSettings: !this.state.showSettings})
        },

        toggleHidden: function () {
            this.setState({hidden: !this.state.hidden})
        },

        componentWillUpdate: function (nextProps, nextState) {
            if (this.state.tray !== nextState.tray) {
                trackingRepository.saveTray(this.props.trayId, nextState.tray)
            }
        },

        updateTray: function (includedProjects, retrievedProjects) {
            var updatedTray = React.addons.update(this.state.tray, {
                includedProjects: {$set: includedProjects},
                previousProjects: {$set: retrievedProjects}
            })
            this.setState({tray: updatedTray})
        }
    })

}