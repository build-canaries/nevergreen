var React = require('react/addons')

module.exports = {
    AvailableProject: React.createClass({
        propTypes: {
            project: React.PropTypes.object.isRequired,
            selectProject: React.PropTypes.func.isRequired
        },

        render: function () {
            return (
                <p className='tracking-cctray-group-build-item'>
                    <label className='label-checkbox'>
                        <input className='checkbox no-text-selection' type='checkbox' checked={this.props.project.included} onChange={this.onChange} disabled={this.props.project.wasRemoved} />
                        <span className={this.props.project.wasRemoved ? 'tracking-removed-project' : ''}>{this.props.project.name}</span>
                    {this.props.project.isNew ? <sup className='tracking-new-project'> new</sup> : ''}
                    {this.props.project.wasRemoved ? <sup className='tracking-removed-info'> removed</sup> : ''}
                    </label>
                </p>
            )
        },

        onChange: function (event) {
            this.props.selectProject(event.target.checked)
        }
    })
}