var React = require('react')
var RouteHandler = require('react-router').RouteHandler
var Menu = require('./general/menu')

var persistStore = require('../stores/PersistStore')

module.exports = React.createClass({
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

  componentDidMount: function () {
    persistStore.init().then(function () {
      persistStore.load()
    })
  }
})
