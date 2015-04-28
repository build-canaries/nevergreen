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
            var view

            if (this.state.showSettings) {
                view = <TraySettings trayId={this.props.trayId} tray={this.state.tray} removeTray={this.props.removeTray}/>
            } else {
                var projects = trays.projects(this.state.tray, this.state.retrievedProjects)
                view = <Projects projects={projects} includeAll={this.includeAll} excludeAll={this.excludeAll} selectProject={this.selectProject}/>
            }

            var doneView = (
                <div>
                    <button className='dashboard-button dashboard-button-small dashboard-button-white' onClick={this.toggleSettingsView}>
                        { this.state.showSettings ? 'Projects' : 'Settings' }
                    </button>
                    {view}
                </div>
            )

            return (
                <section className='tray'>
                    <h3 className='tray-title'>{this.state.tray.url}</h3>
                    <AsyncActionWrapper promise={this.fetchProjects} doneView={doneView}/>
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
                var retrievedProjectNames = data.projects.map(function (project) {
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