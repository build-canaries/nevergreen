var $ = require('jquery')
var React = require('react')
var ProjectsView = require('./projects')
var Success = require('./successView')
var Error = require('../general/error')
var LoadingView = require('../general/loading')
var projectsController = require('../../controllers/projects')
var timingRepository = require('../../storage/timingRepository')

module.exports = {
    MonitorSection: React.createClass({
        getInitialState: function () {
            return {
                loaded: false,
                error: false,
                projects: []
            }
        },

        render: function () {
            var content
            if (!this.state.loaded) {
                content = <LoadingView.Bars />
            } else if (this.state.error) {
                content = <Error.SimpleMessage status={this.state.error.status} reason={this.state.error.statusText} />
            } else if (this.hasProjects()) {
                content = <ProjectsView.InterestingProjects projects={this.state.projects} />
            } else {
                content = <Success.Success />
            }

            return (
                <div className='monitor'>{content}</div>
            )
        },

        componentWillMount: function () {
            projectsController.fetchInteresting(this.updateProjects, this.updateFailed)

            var timer = setInterval(function () {
                projectsController.fetchInteresting(this.updateProjects, this.updateFailed)
            }.bind(this), timingRepository.getPollingTimeInMilliseconds())

            this.setState({timer: timer})
        },

        componentWillUnmount: function () {
            clearInterval(this.state.timer)
        },

        updateProjects: function (data) {
            if (this.isMounted()) {
                this.setState({
                    loaded: true,
                    error: false,
                    projects: data
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

        hasProjects: function () {
            return this.state.projects.length > 0
        }
    })
}
