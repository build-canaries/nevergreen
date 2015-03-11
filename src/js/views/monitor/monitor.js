var $ = require('jquery')
var React = require('react')
var projectsView = require('./projects')
var successView = require('./success')
var errorView = require('../general/error')
var loadingView = require('../general/loading')
var projectsService = require('../../services/projects')
var repo = require('../../storage/repository')
var successRepository = require('../../storage/successRepository')(repo)

var MonitorContents = React.createClass({

    render: function () {
        var content
        if (!this.hasLoaded()) {
            content = loadingView.Spinner()
        } else if (this.hasProjects()) {
            content = projectsView.InterestingProjects(this.state.projects)
        } else {
            var message = successRepository.randomSuccessMessage()
            if (message.isUrl) {
                content = successView.SuccessImage(message.message)
            } else {
                content = successView.SuccessMessage(message.message)
            }
        }

        return (
            <div className='monitor'>{content}</div>
        )
    },

    componentWillMount: function () {
        projectsService.fetchInteresting(this.updateProjects, errorView.render)
    },

    componentDidMount: function () {
        var timer = setInterval(function () {
            projectsService.fetchInteresting(this.updateProjects, errorView.render)
        }.bind(this), this.props.pollingInterval)

        this.setState({timer: timer})
    },

    componentWillUnmount: function () {
        clearInterval(this.state.timer)
    },

    updateProjects: function (data) {
        if (this.isMounted()) {
            this.setState({
                loaded: true,
                projects: data
            })
        }
    },

    hasLoaded: function () {
        return this.state && this.state.projects
    },

    hasProjects: function () {
        return this.hasLoaded() && this.state.projects.length !== 0
    }
})

module.exports = {
    render: function (pollingInterval) {
        React.render(<MonitorContents pollingInterval={pollingInterval} />, $('#content')[0])
    }
}
