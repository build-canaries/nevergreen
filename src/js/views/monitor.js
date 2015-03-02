var $ = require('jquery')
var React = require('react')
var styler = require('../monitor/styler')

var InterestingProject = React.createClass({
    render: function () {
        return (
            <li className={'monitor-project monitor-' + this.props.prognosis}>
                <div className='monitor-outerContainer'>
                    <div className='monitor-innerContainer'>{this.props.name}</div>
                </div>
            </li>
        )
    }
})

var InterestingProjects = React.createClass({
    render: function () {
        return (
            <ul id='interesting-projects' className='monitor-projects'>
            {
                this.props.projects.map(function (project) {
                    return <InterestingProject key={project.name} prognosis={project.prognosis} name={project.name} />
                })
            }
            </ul>
        )
    },

    componentDidMount: function () {
        styler.styleProjects(this.props.projects, $(this.getDOMNode()).find('.monitor-outerContainer'))
    }
})

module.exports = {
    render: function (projects) {
        React.render(<InterestingProjects projects={projects}/>, $('#content')[0]);
    }
}
