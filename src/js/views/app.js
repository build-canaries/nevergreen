var React = require('react')
var Menu = require('./general/menu')
var LocalRepository = require('../storage/LocalRepository')
var ConfigurationActions = require('../actions/ConfigurationActions')
var Validation = require('../validation')
var Package = require('../../../package')

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      versionNumber: Package.version,
      versionName:  Package.versionName,
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
    Validation.init()
    LocalRepository.init(this.props.versionNumber)
      .then(ConfigurationActions.load)
  }
})
