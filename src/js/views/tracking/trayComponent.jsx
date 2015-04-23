var React = require('react/addons')
var LoadingView = require('../general/loading').Bars
var projectsController = require('../../controllers/projects')
var trackingRepository = require('../../storage/trackingRepository')
var Projects = require('./projectsComponent').Projects
var trays = require('../../controllers/trays')
var ErrorView = require('../general/errorView').SimpleMessage
var _ = require('lodash')

module.exports = {
    Tray: React.createClass({
        propTypes: {
            trayId: React.PropTypes.string.isRequired
        },

        getInitialState: function () {
            return {
                loaded: false,
                error: false,
                tray: trackingRepository.getTray(this.props.trayId),
                retrievedProjects: []
            }
        },

        render: function () {
            if (!this.state.loaded) {
                return <LoadingView />

            } else if (this.state.error) {
                return <ErrorView status={this.state.error.status} reason={this.state.error.responseText} />

            } else {
                var projects = trays.projects(this.state.tray, this.state.retrievedProjects)

                return (
                    <section className='tray'>
                        <h3 className='tray-title'>{this.state.tray.url}</h3>
                        <fieldset className='tracking-cctray-group-builds tray-content'>
                            <legend className='tracking-cctray-group-builds-legend'>Available builds</legend>
                            <div className='tracking-cctray-group-build-toggles'>
                                <button className='testing-include-all dashboard-button dashboard-button-small dashboard-button-white' onClick={this.includeAll}>Include all</button>
                                <button className='dashboard-button dashboard-button-small dashboard-button-white' onClick={this.excludeAll}>Exclude all</button>
                            </div>
                            <Projects projects={projects} selectProject={this.selectProject} />
                        </fieldset>
                    </section>
                )
            }
        },

        componentDidMount: function () {
            projectsController.fetchAll(this.state.tray, this.projectsLoaded, this.projectsFailed)
        },

        projectsLoaded: function (data) {
            if (this.isMounted()) {
                var retrievedProjectNames = data.projects.map(function (project) {
                    return project.name
                })
                this.setState({
                    loaded: true,
                    error: false,
                    retrievedProjects: retrievedProjectNames
                })
            }
        },

        projectsFailed: function (data) {
            if (this.isMounted()) {
                this.setState({
                    loaded: true,
                    error: data,
                    retrievedProjects: []
                })
            }
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
                var updatedTray = _.assign({}, nextState.tray, {previousProjects: nextState.retrievedProjects})
                trackingRepository.saveTray(this.props.trayId, updatedTray)
            }
        }
    })

}