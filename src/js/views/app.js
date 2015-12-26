const React = require('react')
const Menu = require('./general/menu')
const Package = require('../../../package')
const AppActions = require('../actions/AppActions')
const AppStore = require('../stores/AppStore')

function getStateFromStore() {
  return {
    loaded: AppStore.isInitalised()
  }
}

module.exports = React.createClass({
  getDefaultProps() {
    return {
      versionNumber: Package.version,
      versionName: Package.versionName,
      commitHash: 'local'
    }
  },

  getInitialState() {
    return getStateFromStore()
  },

  componentWillMount() {
    AppStore.addListener(this._onChange)
    AppActions.init()
  },

  componentWillUnmount() {
    AppStore.removeListener(this._onChange)
  },

  render() {
    return (
      <div>
        <h1 className='visually-hidden'>Nevergreen</h1>

        <div id='menu'>
          <Menu versionNumber={this.props.versionNumber}
                versionName={this.props.versionName}
                commitHash={this.props.commitHash}/>
        </div>
        {this.state.loaded ? this.props.children : ''}
      </div>
    )
  },

  _onChange() {
    this.setState(getStateFromStore())
  }
})
