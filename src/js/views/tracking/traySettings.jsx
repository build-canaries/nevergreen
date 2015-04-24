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
                    <p>id: {this.props.trayId}</p>
                    <p>url: {this.props.tray.url}</p>
                    <button className='dashboard-button dashboard-button-small dashboard-button-white' onClick={this.removeTray}>Remove</button>
                </section>
            )
        },

        removeTray: function () {
            this.props.removeTray(this.props.trayId)
        }
    })
}