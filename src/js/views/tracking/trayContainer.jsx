var React = require('react')
var _ = require('lodash')
var trackingRepository = require('../../storage/trackingRepository')
var projectsController = require('../../controllers/projects')
var trays = require('../../controllers/trays')
var Projects = require('./projects').Projects
var TraySettings = require('./traySettings').TraySettings
var AsyncActionWrapper = require('../general/asyncActionWrapper').AsyncActionWrapper

module.exports = {
    TrayContainer: React.createClass({
        propTypes: {
            trayId: React.PropTypes.string.isRequired,
            removeTray: React.PropTypes.func.isRequired
        },

        getInitialState: function () {
            return {
                showSettings: false,
                tray: trackingRepository.getTray(this.props.trayId),
                retrievedProjects: []
            }
        },

        render: function () {
            var content

            if (this.state.showSettings) {
                content = <TraySettings trayId={this.props.trayId} tray={this.state.tray} removeTray={this.props.removeTray}/>
            } else {
                var projects = trays.projects(this.state.tray, this.state.retrievedProjects)
                var doneView = <Projects projects={projects} includeAll={this.includeAll} excludeAll={this.excludeAll} selectProject={this.selectProject}/>
                content = <AsyncActionWrapper promise={this.fetchProjects} doneView={doneView}/>
            }

            return (
                <section className='tray'>
                    <div className='tray-title-container'>
                        <h3 className='tray-title'>{this.state.tray.url}</h3>
                        <button className='tray-settings-button' onClick={this.toggleSettingsView}>
                            <span className={'icon-' + (this.state.showSettings ? 'cross' : 'cog') }></span>
                            <span className='visuallyhidden'>{this.state.showSettings ? 'close' : 'settings'}</span>
                        </button>
                    </div>
                    {content}
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

        includeAll: function () {
            var updatedTray = React.addons.update(this.state.tray, {
                includedProjects: {$set: this.state.retrievedProjects}
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
                var updatedTray = _.assign({}, nextState.tray, {previousProjects: this.state.retrievedProjects})
                trackingRepository.saveTray(this.props.trayId, updatedTray)
            }
        },

        projectsLoaded: function (data) {
            if (this.isMounted()) {
                var retrievedProjectNames = data.map(function (project) {
                    return project.name
                })
                this.setState({retrievedProjects: retrievedProjectNames})
            }
        },

        fetchProjects: function () {
            return projectsController.fetchAll(this.state.tray)
                .done(this.projectsLoaded)
        }
    })

}