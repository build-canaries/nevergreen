var $ = require('jquery')
var React = require('react')
var styler = require('../../controllers/styler')
var trackingRepository = require('../../storage/trackingRepository')

var InterestingProject = React.createClass({
    propTypes: {
        prognosis: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        stage: React.PropTypes.string,
        trayId: React.PropTypes.string.isRequired
    },

    displayText: function () {
        var showStage = trackingRepository.getTray(this.props.trayId).showStage
        if (showStage && this.props.stage) {
            return this.props.name + ' [' + this.props.stage + ']'
        } else {
            return this.props.name
        }
    },

    render: function () {
        return (
            <li className={'monitor-project monitor-' + this.props.prognosis}>
                <div className='monitor-outer-container'>
                    <div className='monitor-inner-container'>{this.displayText()}</div>
                </div>
            </li>
        )
    }
})

module.exports = {
    InterestingProjects: React.createClass({
        propTypes: {
            projects: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
        },

        render: function () {
            return (
                <ul id='interesting-projects' className='monitor-projects'>
                    {
                        this.props.projects.map(function (project) {
                            var key = project['tray-id'] + '.' + project.name
                            return <InterestingProject key={key} trayId={project['tray-id']}
                                                       prognosis={project.prognosis}
                                                       name={project.name} stage={project.stage}/>
                        })
                    }
                </ul>
            )
        },

        componentDidMount: function () {
            var $node = $(React.findDOMNode(this))
            styler.styleProjects(this.props.projects, $node.find('.monitor-outer-container'), $node)
        },

        componentDidUpdate: function () {
            var $node = $(React.findDOMNode(this))
            styler.styleProjects(this.props.projects, $node.find('.monitor-outer-container'), $node)
        }
    })
}
