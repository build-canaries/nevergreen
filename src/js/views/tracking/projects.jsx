var React = require('react')
var AvailableProject = require('./availableProject').AvailableProject

module.exports = {
    Projects: React.createClass({
        propTypes: {
            projects: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
            includeAll: React.PropTypes.func.isRequired,
            excludeAll: React.PropTypes.func.isRequired,
            selectProject: React.PropTypes.func.isRequired
        },

        render: function () {
            return (
                <fieldset className='tracking-cctray-group-builds tray-content'>
                    <legend className='tracking-cctray-group-builds-legend'>Available Projects</legend>
                    <div className='tracking-cctray-group-build-toggles'>
                        <button className='testing-include-all button' onClick={this.includeAll}>Include all</button>
                        <button className='button' onClick={this.excludeAll}>Exclude all</button>
                    </div>
                    <div className='testing-projects tracking-cctray-group-build-items'>
                        {
                            this.props.projects.map(function (project) {
                                return <AvailableProject key={project.name} project={project} selectProject={this.selectProject.bind(this, project.name)}/>
                            }.bind(this))
                        }
                    </div>
                </fieldset>
            )
        },

        selectProject: function (name, included) {
            this.props.selectProject(name, included)
        },

        includeAll: function () {
            this.props.includeAll()
        },

        excludeAll: function () {
            this.props.excludeAll()
        }
    })

}