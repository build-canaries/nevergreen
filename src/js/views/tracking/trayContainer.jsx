var React = require('react')
var trackingRepository = require('../../storage/trackingRepository')
var Tray = require('./trayComponent').Tray
var TraySettings = require('./traySettings').TraySettings
var _ = require('lodash')

module.exports = {
    TrayContainer: React.createClass({
        propTypes: {
            trayId: React.PropTypes.string.isRequired,
            removeTray: React.PropTypes.func.isRequired
        },

        getInitialState: function () {
            return {
                showSettings: false,
                tray: trackingRepository.getTray(this.props.trayId)
            }
        },

        render: function () {
            var view

            if (this.state.showSettings) {
                view = <TraySettings trayId={this.props.trayId} tray={this.state.tray} removeTray={this.props.removeTray}/>
            } else {
                view = <Tray tray={this.state.tray} includeAll={this.includeAll} excludeAll={this.excludeAll} selectProject={this.selectProject}/>
            }

            return (
                <section className='tray'>
                    <h3 className='tray-title'>{this.state.tray.url}</h3>
                    <button
                        className='dashboard-button dashboard-button-small dashboard-button-white'
                        onClick={this.toggleSettingsView}>
                        {
                            this.state.showSettings ? 'Projects' : 'Settings'
                        }
                    </button>
                    {view}
                </section>
            )
        },

        toggleSettingsView: function () {
            this.setState({showSettings: !this.state.showSettings})
        },

        selectProject: function (name, included) {
            var command
            if (included) {
                command = {$push: [name]}
            } else {
                command = {$splice: [[this.state.tray.includedProjects.indexOf(name), 1]]}
            }

            var updatedTray = React.addons.update(this.state.tray, {
                includedProjects: command
            })
            this.setState({tray: updatedTray})
        },

        includeAll: function (retrievedProjects) {
            var updatedTray = React.addons.update(this.state.tray, {
                includedProjects: {$set: retrievedProjects}
            })
            this.setState({tray: updatedTray})
        },

        excludeAll: function () {
            var updatedTray = React.addons.update(this.state.tray, {
                includedProjects: {$set: []}
            })
            this.setState({tray: updatedTray})
        },

        componentWillUpdate: function (nextProps, nextState) {
            if (this.state.tray !== nextState.tray) {
                var updatedTray = _.assign({}, nextState.tray, {previousProjects: nextState.retrievedProjects})
                trackingRepository.saveTray(this.props.trayId, updatedTray)
            }
        }
    })

}