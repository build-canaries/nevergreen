var React = require('react/addons')
var timingRepository = require('../../storage/timingRepository')

module.exports = {
    TimingSection: React.createClass({
        mixins: [React.addons.LinkedStateMixin],

        getInitialState: function () {
            return {pollingTime: timingRepository.getPollingTime()}
        },

        render: function () {
            return (
                <section id="timing" className="dashboard-main-section">
                    <h3 className='success-title'>Polling</h3>
                    <div className="tracking-cctray-group-cctray-form">
                        <div>
                            <label htmlFor="polling-time">Poll for project changes every</label>
                            <input id="polling-time" className="tracking-cctray-group-cctray-form-input-small tracking-cctray-group-cctray-form-input" type="number" min="1" max="99" valueLink={this.linkState('pollingTime')} />
                            seconds
                        </div>
                    </div>
                </section>
            )
        },

        componentWillUpdate: function (nextProps, nextState) {
            timingRepository.savePollingTime(nextState.pollingTime)
        }
    })
}