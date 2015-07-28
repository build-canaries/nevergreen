var React = require('react/addons')
var _ = require('lodash')
var trackingRepository = require('../../storage/trackingRepository')

module.exports = {
    TraySettings: React.createClass({
        propTypes: {
            trayId: React.PropTypes.string.isRequired,
            removeTray: React.PropTypes.func.isRequired
        },

        getInitialState: function () {
            return {
                tray: trackingRepository.getTray(this.props.trayId)
            }
        },

        render: function () {
            return (
                <section className='tray-settings'>
                    <table className='tray-settings-table'>
                        <tbody>
                            <tr>
                                <td className='tray-settings-table-heading'>uses auth?</td>
                                <td>{_.trim(this.state.tray.username) === '' ? 'no' : 'yes'}</td>
                            </tr>
                            <tr>
                                <td className='tray-settings-table-heading'>Show stage name?</td>
                                <td>
                                    <input ref='showStage' className='checkbox no-text-selection' type='checkbox' checked={this.state.tray.showStage} onChange={this.toggleShowStage} />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className='tray-settings-danger-zone'>
                        <h4 className='tray-settings-danger-zone-title'>Danger Zone</h4>
                        <div className='tray-settings-danger-zone-content'>
                            <button className='button tray-settings-danger-button' onClick={this.removeTray}>Delete this tray</button>
                            <span>Once you delete a tray, there is no going back. Please be certain.</span>
                        </div>
                    </div>
                </section>
            )
        },

        removeTray: function () {
            this.props.removeTray(this.props.trayId)
        },

        toggleShowStage: function () {
            var updatedTray = React.addons.update(this.state.tray, {
                showStage: {$set: !this.state.tray.showStage}
            })
            trackingRepository.saveTray(this.props.trayId, updatedTray)
            this.setState({tray: updatedTray})
        }
    })
}
