var React = require('react/addons')
var trays = require('../../controllers/trays')
var security = require('../../controllers/security')
var trackingRepository = require('../../storage/trackingRepository')
var AddTrayComponent = require('./addTrayComponent')
var TrayComponent = require('./trayComponent')

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
                        {
                            this.state.trays.map(function (tray) {
                                return <TrayComponent.Tray key={tray.url} tray={tray} />
                            }.bind(this))
                            }
                    </fieldset>
                </section>
            )
        },

        componentWillMount: function () {
            this.setState({trays: trackingRepository.getTrays()})
        },

        addTray: function (tray) {
            if (trays.requiresAuth(tray)) {
                security.encryptPassword(tray.password, function (data) {
                    var newTrays = React.addons.update(this.state.trays, {
                        $set: [{
                            url: tray.url,
                            username: tray.username,
                            password: data.password,
                            includedProjects: [],
                            previousProjects: []
                        }]
                    })
                    this.setState({trays: newTrays})
                }.bind(this))
            } else {
                var newTrays = React.addons.update(this.state.trays, {
                    $set: [{
                        url: tray.url,
                        username: '',
                        password: '',
                        includedProjects: [],
                        previousProjects: []
                    }]
                })
                this.setState({trays: newTrays})
            }
        }
    })
}