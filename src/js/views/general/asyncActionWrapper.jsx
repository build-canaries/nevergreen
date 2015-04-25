var React = require('react')
var LoadingView = require('../general/loading').Bars
var ErrorView = require('../general/errorView').SimpleMessage

module.exports = {
    AsyncActionWrapper: React.createClass({
        propTypes: {
            promise: React.PropTypes.func.isRequired,
            doneView: React.PropTypes.element.isRequired
        },

        getInitialState: function () {
            return {
                loaded: false,
                error: false
            }
        },

        render: function () {
            if (!this.state.loaded) {
                return <LoadingView />
            } else if (this.state.error) {
                return <ErrorView status={this.state.error.status} reason={this.state.error.responseText}/>
            }
            return this.props.doneView
        },

        componentDidMount: function () {
            this.props.promise()
                .done(this.done)
                .fail(this.fail)
        },

        done: function () {
            this.setState({
                loaded: true,
                error: false
            })
        },

        fail: function (data) {
            this.setState({
                loaded: true,
                error: data
            })
        }
    })
}