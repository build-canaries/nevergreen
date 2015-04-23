var React = require('react')

module.exports = {
    Bars: React.createClass({
        render: function () {
            return (
                <div id='spinner' className='center-above config-spinner'>
                    <img src='img/loading-bars.svg' alt='loading'/>
                </div>
            )
        }
    })
}