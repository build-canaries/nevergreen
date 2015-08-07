var React = require('react')
var projectsGateway = require('../../gateways/projectsGateway')
var trays = require('../../controllers/trays')
var AvailableProject = require('./availableProject').AvailableProject
var ErrorView = require('../general/errorView').SimpleMessage
var Loading = require('../general/loading').Bars

module.exports = {
    Projects: React.createClass({
        propTypes: {
            tray: React.PropTypes.object.isRequired,
            updateTray: React.PropTypes.func.isRequired
        },

        getInitialState: function () {
            return {
                loaded: false,
                error: false,
                retrievedProjects: this.props.tray.previousProjects,
                includedProjects: this.props.tray.includedProjects
            }
        },

        componentWillMount: function () {
            projectsGateway.fetchAll(this.props.tray)
                .done(this.projectsLoaded)
                .fail(this.updateFailed)
        },

        render: function () {
            var content

            if (!this.state.loaded) {
                content = <Loading />

            } else if (this.state.error) {
                content = <ErrorView status={this.state.error.status} reason={this.state.error.responseText}/>

            } else {
                var projects = trays.projects(this.state.includedProjects, this.props.tray.previousProjects, this.state.retrievedProjects)

                content = (
                    <fieldset className='tracking-cctray-group-builds tray-content'>
                        <legend className='tracking-cctray-group-builds-legend'>Available Projects</legend>
                        <div className='tracking-cctray-group-build-toggles'>
                            <button className='testing-include-all button' onClick={this.includeAll}>Include all</button>
                            <button className='button' onClick={this.excludeAll}>Exclude all</button>
                        </div>
                        <div className='testing-projects tracking-cctray-group-build-items'>
                            {
                                projects.map(function (project) {
                                    return <AvailableProject key={project.name}
                                                             name={project.name}
                                                             included={project.included}
                                                             wasRemoved={project.wasRemoved}
                                                             isNew={project.isNew}
                                                             selectProject={this.selectProject.bind(this, project.name)}/>
                                }.bind(this))
                            }
                        </div>
                    </fieldset>
                )
            }

            return content
        },

        selectProject: function (name, included) {
            var command
            if (included) {
                command = {$push: [name]}
            } else {
                command = {$splice: [[this.state.includedProjects.indexOf(name), 1]]}
            }

            var updatedIncludedProjects = React.addons.update(this.state.includedProjects, command)
            this.setState({includedProjects: updatedIncludedProjects})
        },

        includeAll: function () {
            this.setState({includedProjects: this.state.retrievedProjects})
        },

        excludeAll: function () {
            this.setState({includedProjects: []})
        },

        projectsLoaded: function (data) {
            if (this.isMounted()) {
                var retrievedProjectNames = data.map(function (project) {
                    return project.name
                })
                this.setState({
                    loaded: true,
                    error: false,
                    retrievedProjects: retrievedProjectNames
                })
            }
        },

        updateFailed: function (data) {
            if (this.isMounted()) {
                this.setState({
                    loaded: true,
                    error: data
                })
            }
        },

        componentWillUpdate: function (nextProps, nextState) {
            if (this.state.includedProjects !== nextState.includedProjects
                || this.state.retrievedProjects !== nextState.retrievedProjects)
            {
                this.props.updateTray(nextState.includedProjects, nextState.retrievedProjects)
            }
        }
    })

}