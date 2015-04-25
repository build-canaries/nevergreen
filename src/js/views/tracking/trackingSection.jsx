var React = require('react/addons')
var _ = require('lodash')
var uuid = require('node-uuid')
var trays = require('../../controllers/trays')
var security = require('../../controllers/security')
var trackingRepository = require('../../storage/trackingRepository')
var AddTray = require('./addTrayComponent').AddTray
var Tray = require('./trayContainer').TrayContainer

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
                        <AddTray addTray={this.addTray}/>

                        <div className='tracking-cctrays'>
                            {
                                _.map(this.state.trays, function (trayId) {
                                    return <Tray key={trayId} trayId={trayId} removeTray={this.removeTray}/>
                                }, this)
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
                var newTrays = React.addons.update(this.state.trays, {$push: [trayId]})
                this.setState({trays: newTrays})
            }
        },

        removeTray: function (trayId) {
            var updatedTrays = React.addons.update(this.state.trays, {$splice: [[this.state.trays.indexOf(trayId), 1]]})
            this.setState({trays: updatedTrays})
        },

        componentWillUpdate: function (nextProps, nextState) {
            if (this.state.trays !== nextState.trays) {
                trackingRepository.saveTrays(nextState.trays)
                _.forEach(_.difference(this.state.trays, nextState.trays), function (id) {
                    trackingRepository.removeTray(id)
                })
            }
        }
    })
}