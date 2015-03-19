var React = require('react/addons')
var $ = require('jquery')
var trays = require('../../services/trays')
var security = require('../../services/security')
var AddTrayComponent = require('./addTrayComponent')
var TrayComponent = require('./trayComponent')

var TrackingSection = React.createClass({
    propTypes: {
        trays: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    getInitialState: function () {
        return {trays: this.props.trays}
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

module.exports = {
    render: function (trays) {
        React.render(<TrackingSection trays={trays} />, $('#tracking-content')[0])
    }
}