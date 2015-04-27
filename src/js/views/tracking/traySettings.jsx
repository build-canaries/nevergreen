var React = require('react')

module.exports = {
    TraySettings: React.createClass({
        propTypes: {
            trayId: React.PropTypes.string.isRequired,
            tray: React.PropTypes.object.isRequired,
            removeTray: React.PropTypes.func.isRequired
        },

        render: function () {
            return (
                <section className='tray-settings'>
                    <label>id</label>
                    <span>{this.props.trayId}</span>
                    <label>url</label>
                    <span>{this.props.tray.url}</span>

                    <h4 className='tray-settings-danger-zone-title'>Danger Zone</h4>
                    <button className='dashboard-button dashboard-button-small dashboard-button-white' onClick={this.removeTray}>Delete this tray</button>
                </section>
            )
        },

        removeTray: function () {
            this.props.removeTray(this.props.trayId)
        }
    })
}