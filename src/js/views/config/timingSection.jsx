var React = require('react')
var $ = require('jquery')
var timingRepository = require('../../storage/timingRepository')

module.exports = {
    TimingSection: React.createClass({
        getInitialState: function () {
            return {pollingTime: timingRepository.getPollingTime()}
        },

        render: function () {
            return (
                <section id="timing" className="dashboard-main-section">
                    <fieldset className="tracking-cctray-group">
                        <div className="tracking-cctray-group-cctray-form">
                            <div>
                                <label htmlFor="polling-time">Poll for project changes every</label>
                                <input id="polling-time" className="tracking-cctray-group-cctray-form-input-small tracking-cctray-group-cctray-form-input" type="number" min="1" value={this.state.pollingTime} onChange={this.onChange}/>
                                seconds
                            </div>
                        </div>
                    </fieldset>
                </section>
            )
        },

        componentWillMount: function () {
            this.setState({pollingTime: timingRepository.getPollingTime()})
        },

        onChange: function (event) {
            this.setState({pollingTime: event.target.value})
        },

        componentWillUpdate: function (nextProps, nextState) {
            timingRepository.savePollingTime(nextState.pollingTime)
        }
    })
}