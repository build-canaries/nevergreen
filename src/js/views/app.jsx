var React = require('react')
var Menu = require('./general/menu')
var LocalRepository = require('../storage/LocalRepository')
var ConfigurationActions = require('../actions/ConfigurationActions')

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      versionNumber: '0.8.0',
      versionName: 'Heat Wave',
      commitHash: 'local'
    }
  },

  render: function () {
    return (
      <div>
        <h1 className='visually-hidden'>Nevergreen</h1>

        <div id='menu'>
          <Menu versionNumber={this.props.versionNumber}
                versionName={this.props.versionName}
                commitHash={this.props.commitHash}/>
        </div>
        {this.props.children}
      </div>
    )
  },

  componentDidMount: function () {
    LocalRepository.init(this.props.versionNumber)
      .then(ConfigurationActions.load)
  }
})
