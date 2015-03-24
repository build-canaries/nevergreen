var React = require('react/addons')
var LoadingView = require('../general/loading')
var projectsController = require('../../controllers/projects')
var trackingRepository = require('../../storage/trackingRepository')
var ProjectsComponent = require('./projectsComponent')
var trays = require('../../controllers/trays')
var ErrorView = require('../general/errorView')

module.exports = {
    Tray: React.createClass({
        propTypes: {
            tray: React.PropTypes.object.isRequired
        },
        
        getInitialState: function () {
            return {
                loaded: false,
                error: false,
                tray: this.props.tray,
                retrievedProjects: []
            }
        },

        render: function () {
            if (!this.state.loaded) {
                return <LoadingView.Bars />

            } else if (this.state.error) {
                return <ErrorView.SimpleMessage status={this.state.error.status} reason={this.state.error.statusText} />

            } else {
                return (
                    <fieldset id='projects-controls' className='tracking-cctray-group-builds'>
                        <legend className='tracking-cctray-group-builds-legend'>Available builds</legend>
                        <div className='tracking-cctray-group-build-toggles'>
                            <button id='include-all' className='dashboard-button dashboard-button-small dashboard-button-white' onClick={this.includeAll}>Include all</button>
                            <button id='exclude-all' className='dashboard-button dashboard-button-small dashboard-button-white' onClick={this.excludeAll}>Exclude all</button>
                        </div>
                        <ProjectsComponent.Projects projects={trays.projects(this.state.tray, this.state.retrievedProjects)} selectProject={this.selectProject} />
                    </fieldset>
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
                    error: data
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
                trackingRepository.saveTray(nextState.tray)
            }
        }
    })

}