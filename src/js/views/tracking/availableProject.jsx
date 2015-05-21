var React = require('react/addons')

module.exports = {
    AvailableProject: React.createClass({
        propTypes: {
            project: React.PropTypes.object.isRequired,
            selectProject: React.PropTypes.func.isRequired
        },

        render: function () {
            var labelClass = this.props.project.wasRemoved ? 'label-checkbox-disabled' : 'label-checkbox'
            var nameClass = this.props.project.wasRemoved ? 'tracking-removed-project' : ''
            var info = ''

            if (this.props.project.isNew) {
                info = <sup className='tracking-new-project'> new</sup>
            } else if (this.props.project.wasRemoved) {
                info = <sup> removed</sup>
            }

            return (
                <p className='tracking-cctray-group-build-item'>
                    <label className={labelClass}>
                        <input className='checkbox no-text-selection' type='checkbox' checked={this.props.project.included} onChange={this.onChange} disabled={this.props.project.wasRemoved}/>
                        <span className={nameClass}>{this.props.project.name}</span>
                        {info}
                    </label>
                </p>
            )
        },

        onChange: function (event) {
            this.props.selectProject(event.target.checked)
        }
    })
}
