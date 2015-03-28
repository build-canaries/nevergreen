var $ = require('jquery')
var React = require('react')
var ProjectsView = require('./projectsView')
var SuccessView = require('./successView')
var ErrorView = require('../general/errorView')
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
                content = <ErrorView.SimpleMessage status={this.state.error.status} reason={this.state.error.statusText} />

            } else if (this.hasProjects()) {
                content = <ProjectsView.InterestingProjects projects={this.state.projects} />

            } else {
                content = <SuccessView.Success />
            }

            return (
                <div className='monitor' onMouseMove={this.animateMenu}>{content}</div>
            )
        },

        componentWillMount: function () {
            projectsController.fetchInteresting(this.updateProjects, this.updateFailed)

            var updateTimer = setInterval(function () {
                projectsController.fetchInteresting(this.updateProjects, this.updateFailed)
            }.bind(this), timingRepository.getPollingTimeInMilliseconds())

            this.setState({timer: updateTimer})
        },

        componentWillUnmount: function () {
            clearInterval(this.state.timer)
            this.clearMenuTimeOut()
            this.showMenu()
        },

        componentDidMount: function () {
            this.hideMenu()
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
        },

        animateMenu: function () {
            this.clearMenuTimeOut()
            this.showMenu()
            this.setState({menuTimer: setInterval(function () {
                this.hideMenu()
            }.bind(this), 1000)})
        },

        showMenu: function () {
            $("#menu").fadeIn()
        },

        hideMenu: function () {
            if (this.isMounted()) {
                $("#menu").fadeOut(1000)
            }
        },

        clearMenuTimeOut: function () {
            clearInterval(this.state.menuTimer)
        }
    })
}
