var React = require('react')
var Router = require('react-router')
var Menu = require('./general/menu').Menu
var migrations = require('../storage/migrations')

module.exports = {
    App: React.createClass({
        render: function () {
            return (
                <div>
                    <div id='menu'>
                        <Menu />
                    </div>
                    <Router.RouteHandler/>
                </div>
            )
        },

        componentWillMount: function () {
            migrations.migrate()
        }
    })
}
