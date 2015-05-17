var React = require('react/addons')
var _ = require('lodash')
var uuid = require('node-uuid')
var trays = require('../../controllers/trays')
var security = require('../../controllers/security')
var trackingRepository = require('../../storage/trackingRepository')
var AddTray = require('./addTray').AddTray
var Tray = require('./trayContainer').TrayContainer

module.exports = {
    TrackingSection: React.createClass({
        getInitialState: function () {
            return {trays: trackingRepository.getTrays()}
        },

        render: function () {
            return (
                <section className='dashboard-main-section active'>
                    <h2 className='visually-hidden'>Tracking</h2>

                    <fieldset className='tracking-cctray-group'>
                        <AddTray addTray={this.addTray}/>

                        <div>
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

        addTray: function (trayToAdd) {
            if (trays.requiresAuth(trayToAdd)) {
                security.encryptPassword(trayToAdd.password, function (data) {
                    this.saveTrays(_.extend({}, trayToAdd, {password: data.password}))
                }.bind(this))
            } else {
                this.saveTrays(trayToAdd)
            }
        },

        removeTray: function (trayId) {
            var trayIndex = this.state.trays.indexOf(trayId)
            var updatedTrays = React.addons.update(this.state.trays, {$splice: [[trayIndex, 1]]})
            this.setState({trays: updatedTrays})
        },

        componentWillUpdate: function (nextProps, nextState) {
            if (this.state.trays !== nextState.trays) {
                trackingRepository.saveTrays(nextState.trays)
                _.forEach(_.difference(this.state.trays, nextState.trays), function (id) {
                    trackingRepository.removeTray(id)
                })
            }
        },

        saveTrays: function (newTray) {
            var trayId = uuid.v4()

            trackingRepository.saveTray(trayId, {
                url: newTray.url,
                username: newTray.username,
                password: newTray.password
            })

            var newTrays = React.addons.update(this.state.trays, {$push: [trayId]})
            this.setState({trays: newTrays})
        }
    })
}