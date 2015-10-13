var React = require('react')
var Menu = require('./general/menu')

var LocalRepository = require('../storage/LocalRepository')
var PersistStore = require('../stores/PersistStore')

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
    LocalRepository.init().then(function () {
      return LocalRepository.load()
    }).then(function () {
      PersistStore.init()
    })
  }
})
