var React = require('react/addons')
var trays = require('../../controllers/trays')
var security = require('../../controllers/security')
var trackingRepository = require('../../storage/trackingRepository')
var AddTrayComponent = require('./addTrayComponent')
var TrayComponent = require('./trayComponent')
var uuid = require('node-uuid')

module.exports = {
    TrackingSection: React.createClass({
        getInitialState: function () {
            return {trays: trackingRepository.getTrays()}
        },

        render: function () {
            return (
                <section id='tracking' className='dashboard-main-section active'>
                    <h2 className='visuallyhidden'>Tracking</h2>

                    <fieldset className='tracking-cctray-group'>
                        <AddTrayComponent.AddTray addTray={this.addTray} />

                        <div className='tracking-cctrays'>
                            {
                                this.state.trays.map(function (trayId) {
                                    return <TrayComponent.Tray key={trayId} trayId={trayId} />
                                }.bind(this))
                             }
                        </div>
                    </fieldset>
                </section>
            )
        },

        componentWillMount: function () {
            this.setState({trays: trackingRepository.getTrays()})
        },

        addTray: function (addTray) {
            var trayId = uuid.v4()

            if (trays.requiresAuth(addTray)) {
                security.encryptPassword(addTray.password, function (data) {
                    trackingRepository.saveTray(trayId, {
                        url: addTray.url,
                        username: addTray.username,
                        password: data.password
                    })

                    var newTrays = React.addons.update(this.state.trays, {$set: [trayId]})
                    this.setState({trays: newTrays})
                }.bind(this))
            } else {
                trackingRepository.saveTray(trayId, {
                    url: addTray.url
                })
                var newTrays = React.addons.update(this.state.trays, {$set: [trayId]})
                this.setState({trays: newTrays})
            }
        },

        componentWillUpdate: function (nextProps, nextState) {
            if (this.state.trays !== nextState.trays) {
                trackingRepository.saveTrays(nextState.trays)
            }
        }
    })
}