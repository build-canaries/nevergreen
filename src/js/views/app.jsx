var React = require('react')
var Menu = require('./general/menu')
var LocalRepository = require('../storage/LocalRepository')
var ConfigurationActions = require('../actions/ConfigurationActions')

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
    LocalRepository.init()
      .then(ConfigurationActions.load)
  }
})
