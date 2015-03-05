var $ = require('jquery')
var React = require('react')

var Spinner = React.createClass({
    render: function () {
        return (
            <div id='spinner' className='center-above config-spinner'>
                <img src='img/loading-bars.svg' alt='loading'/>
            </div>
        )
    }
})

module.exports = {
    Spinner: function () {
        return <Spinner />
    }
}