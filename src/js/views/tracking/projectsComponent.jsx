var React = require('react/addons')
var AvailableProject = require('./availableProjectComponent').AvailableProject

module.exports = {

    propTypes: {
        projects: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        selectProject: React.PropTypes.func.isRequired
    },

    Projects: React.createClass({
        render: function () {
            return (
                <div className='testing-projects tracking-cctray-group-build-items'>
                    {
                        this.props.projects.map(function (project) {
                            return <AvailableProject
                                key={project.name}
                                project={project}
                                selectProject={this.selectProject.bind(this, project.name)}/>
                        }.bind(this))
                    }
                </div>
            )
        },

        selectProject: function (name, included) {
            this.props.selectProject(name, included)
        }
    })

}