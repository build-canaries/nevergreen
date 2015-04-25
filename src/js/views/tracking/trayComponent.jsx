var React = require('react/addons')
var Projects = require('./projectsComponent').Projects

module.exports = {
    Tray: React.createClass({
        propTypes: {
            projects: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
            includeAll: React.PropTypes.func.isRequired,
            excludeAll: React.PropTypes.func.isRequired,
            selectProject: React.PropTypes.func.isRequired
        },

        render: function () {
            return (
                <fieldset className='tracking-cctray-group-builds tray-content'>
                    <legend className='tracking-cctray-group-builds-legend'>Available projects</legend>
                    <div className='tracking-cctray-group-build-toggles'>
                        <button className='testing-include-all dashboard-button dashboard-button-small dashboard-button-white' onClick={this.includeAll}>Include all</button>
                        <button className='dashboard-button dashboard-button-small dashboard-button-white' onClick={this.excludeAll}>Exclude all</button>
                    </div>
                    <Projects projects={this.props.projects} selectProject={this.selectProject}/>
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