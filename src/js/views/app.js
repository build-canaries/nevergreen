const React = require('react')
const Menu = require('./general/menu')
const LocalRepository = require('../storage/LocalRepository')
const ConfigurationActions = require('../actions/ConfigurationActions')
const Validation = require('../validation')
const Package = require('../../../package')

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
