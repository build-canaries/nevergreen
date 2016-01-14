const React = require('react')
const Menu = require('./general/menu')
const AppActions = require('../actions/AppActions')
const AppStore = require('../stores/AppStore')

function getStateFromStore() {
  return {
    loaded: AppStore.isInitalised(),
    versionNumber: AppStore.versionNumber(),
    versionName: AppStore.versionName(),
    versionColour: AppStore.versionColour(),
    commitHash: AppStore.commitHash()
  }
}

module.exports = React.createClass({
  displayName: 'App',

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
          <Menu versionNumber={this.state.versionNumber}
                versionName={this.state.versionName}
                versionColour={this.state.versionColour}
                commitHash={this.state.commitHash}/>
        </div>
        {this.state.loaded ? this.props.children : ''}
      </div>
    )
  },

  _onChange() {
    this.setState(getStateFromStore())
  }
})
