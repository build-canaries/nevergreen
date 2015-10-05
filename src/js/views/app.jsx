var React = require('react')
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
        {this.props.children}
      </div>
    )
  },

  componentDidMount: function () {
    persistStore.init().then(function () {
      persistStore.load()
    })
  }
})
