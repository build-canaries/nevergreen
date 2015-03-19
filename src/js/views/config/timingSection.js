var React = require('react')
var $ = require('jquery')
var timingRepository = require('../../storage/timingRepository')

var TimingSection = React.createClass({
    propTypes: {
        pollingTime: React.PropTypes.number.isRequired
    },

    getInitialState: function () {
        return {
            pollingTime: this.props.pollingTime
        }
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

    onChange: function (event) {
        this.setState({pollingTime: event.target.value})
    },

    componentWillUpdate: function (nextProps, nextState) {
        timingRepository.savePollingTime(nextState.pollingTime)
    }
})

module.exports = {
    render: function (pollingTime) {
        React.render(<TimingSection pollingTime={pollingTime} />, $('#timing-content')[0])
    }
}