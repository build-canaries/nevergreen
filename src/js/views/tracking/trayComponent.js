var React = require('react/addons')
var Loading = require('../general/loading')
var projectsService = require('../../services/projects')
var trackingRepository = require('../../storage/trackingRepository')
var AvailableProjectComponent = require('./availableProjectComponent')
var trays = require('../../services/trays')

module.exports = {
    Tray: React.createClass({
        propTypes: {
            tray: React.PropTypes.object.isRequired
        },
        
        getInitialState: function () {
            return {
                loaded: false,
                tray: this.props.tray,
                retrievedProjects: []
            }
        },

        render: function () {
            if (!this.state.loaded) {
                return <Loading.Bars />
            } else {
                return (
                    <fieldset id='projects-controls' className='tracking-cctray-group-builds'>
                        <legend className='tracking-cctray-group-builds-legend'>Available builds</legend>
                        <div className='tracking-cctray-group-build-toggles'>
                            <button id='include-all' className='dashboard-button dashboard-button-small dashboard-button-white' onClick={this.includeAll}>Include all</button>
                            <button id='exclude-all' className='dashboard-button dashboard-button-small dashboard-button-white' onClick={this.excludeAll}>Exclude all</button>
                        </div>
                        <div id='projects' className='tracking-cctray-group-build-items'>
                        {
                            trays.projects(this.state.tray, this.state.retrievedProjects).map(function (project) {
                                return <AvailableProjectComponent.AvailableProject
                                    key={project.name}
                                    project={project}
                                    selectProject={this.selectProject.bind(this, project.name)} />
                            }.bind(this))
                            }
                        </div>
                    </fieldset>
                )
            }
        },

        componentDidMount: function () {
            projectsService.fetchAll(this.state.tray, this.projectsLoaded)
        },

        projectsLoaded: function (data) {
            if (this.isMounted()) {
                var retrievedProjectNames = data.projects.map(function (project) {
                    return project.name
                })
                this.setState({
                    loaded: true,
                    retrievedProjects: retrievedProjectNames
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