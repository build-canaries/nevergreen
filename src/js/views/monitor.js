var $ = require('jquery')
var React = require('react')
var projectsView = require('./projects')
var successView = require('./success')
var errorView = require('./error')
var loadingView = require('./loading')
var projectsService = require('../services/projects')
var repo = require('../storage/repository')
var successRepository = require('../storage/successRepository')(repo)

var MonitorContents = React.createClass({
    getInitialState: function () {
        return {content: loadingView.Spinner()}
    },

    render: function () {
        return this.state.content
    },

    componentWillMount: function () {
        projectsService.fetchInteresting(this.selectView, errorView.render)
    },

    componentDidMount: function () {
        var timer = setInterval(function () {
            projectsService.fetchInteresting(this.selectView, errorView.render)
        }.bind(this), this.props.pollingInterval)

        this.setState({timer: timer})
    },

    componentWillUnmount: function () {
        clearInterval(this.state.timer)
    },

    selectView: function (data) {
        if (this.isMounted()) {
            var content
            if (data.length === 0) {
                var message = successRepository.randomSuccessMessage();
                if (isUrl(message)) {
                    content = successView.SuccessImage(message)
                } else {
                    content = successView.SuccessMessage(message)
                }
            } else {
                content = projectsView.InterestingProjects(data)
            }
            this.setState({content: content})
        }
    }
})

module.exports = {
    render: function (pollingInterval) {
        React.render(<MonitorContents pollingInterval={pollingInterval} />, $('#content')[0])
    }
}

function isUrl(message) {
    return startsWith(message, 'http')
}

function startsWith(s, prefix) {
    return s.lastIndexOf(prefix, 0) === 0
}
