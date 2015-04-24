var React = require('react/addons')
var LoadingView = require('../general/loading').Bars
var projectsController = require('../../controllers/projects')
var Projects = require('./projectsComponent').Projects
var trays = require('../../controllers/trays')
var ErrorView = require('../general/errorView').SimpleMessage

module.exports = {
    Tray: React.createClass({
        propTypes: {
            tray: React.PropTypes.object.isRequired,
            includeAll: React.PropTypes.func.isRequired,
            excludeAll: React.PropTypes.func.isRequired,
            selectProject: React.PropTypes.func.isRequired,
            setRetrievedProjects: React.PropTypes.func.isRequired
        },

        getInitialState: function () {
            return {
                loaded: false,
                error: false,
                retrievedProjects: []
            }
        },

        render: function () {
            if (!this.state.loaded) {
                return <LoadingView />

            } else if (this.state.error) {
                return <ErrorView status={this.state.error.status} reason={this.state.error.responseText}/>

            } else {
                var projects = trays.projects(this.props.tray, this.state.retrievedProjects)

                return (
                    <fieldset className='tracking-cctray-group-builds tray-content'>
                        <legend className='tracking-cctray-group-builds-legend'>Available projects</legend>
                        <div className='tracking-cctray-group-build-toggles'>
                            <button
                                className='testing-include-all dashboard-button dashboard-button-small dashboard-button-white'
                                onClick={this.includeAll}>Include all
                            </button>
                            <button className='dashboard-button dashboard-button-small dashboard-button-white'
                                    onClick={this.excludeAll}>Exclude all
                            </button>
                        </div>
                        <Projects projects={projects} selectProject={this.selectProject}/>
                    </fieldset>
                )
            }
        },

        componentDidMount: function () {
            projectsController
                .fetchAll(this.props.tray)
                .done(this.projectsLoaded)
                .fail(this.projectsFailed)
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
                this.props.setRetrievedProjects(retrievedProjectNames)
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
            this.props.selectProject(name, included)
        },

        includeAll: function () {
            this.props.includeAll(this.state.retrievedProjects)
        },

        excludeAll: function () {
            this.props.excludeAll()
        }
    })

}