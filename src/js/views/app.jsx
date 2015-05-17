var React = require('react')
var RouteHandler = require('react-router').RouteHandler
var Menu = require('./general/menu').Menu
var migrations = require('../storage/migrations')

module.exports = {
    App: React.createClass({
        render: function () {
            return (
                <div>
                    <h1 className='visually-hidden'>Nevergreen</h1>
                    <div id='menu'>
                        <Menu />
                    </div>
                    <RouteHandler/>
                </div>
            )
        },

        componentWillMount: function () {
            migrations.migrate()
        }
    })
}
