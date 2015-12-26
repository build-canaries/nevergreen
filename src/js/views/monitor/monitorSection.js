const $ = require('jquery')
const React = require('react')
const InterestingProjects = require('./projectsView')
const Success = require('./successView')
const Loading = require('../general/loading')
const InterestingProjectsStore = require('../../stores/InterestingProjectsStore')
const InterestingProjectActions = require('../../actions/InterestingProjectActions')
const TrayStore = require('../../stores/TrayStore')
const SelectedProjectsStore = require('../../stores/SelectedProjectsStore')
const Error = require('../general/errorView')

function getStateFromStore() {
  return {
    projects: InterestingProjectsStore.getAll(),
    error: InterestingProjectsStore.getLastError(),
    loaded: true
  }
}

module.exports = React.createClass({
  getInitialState() {
    return {
      projects: [],
      loaded: false
    }
  },

  render() {
    let content
    if (!this.state.loaded) {
      content = <Loading />
    } else if (this.state.error) {
      content = <Error status={this.state.error.status} reason={this.state.error.message}/>
    } else if (this._hasProjects()) {
      content = <InterestingProjects projects={this.state.projects}/>
    } else {
      content = <Success />
    }

    return (
      <div className='monitor' onMouseMove={this._animateMenu}>{content}</div>
    )
  },

  componentDidMount() {
    window.addEventListener('resize', this._onChange)
    InterestingProjectsStore.addListener(this._onChange)
    InterestingProjectActions.pollForChanges(5000, TrayStore.getAll, SelectedProjectsStore.getAll)

    this._hideMenu()
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._onChange)
    InterestingProjectsStore.removeListener(this._onChange)
    InterestingProjectActions.stopPollingForChanges()

    this._clearMenuTimeOut()
    this._showMenu()
  },

  _hasProjects() {
    return this.state.projects.length > 0
  },

  _animateMenu() {
    this._clearMenuTimeOut()
    this._showMenu()
    this.setState({
      menuTimer: setTimeout(() => {
        this._hideMenu()
      }, 3000)
    })
  },

  _showMenu() {
    $('#menu .navigation, .content-info')
      .removeClass('navigation-hide')
      .addClass('navigation-show')
  },

  _hideMenu() {
    if (this.isMounted()) {
      $('#menu .navigation, .content-info')
        .removeClass('navigation-show')
        .addClass('navigation-hide')
    }
  },

  _clearMenuTimeOut() {
    clearTimeout(this.state.menuTimer)
  },

  _onChange() {
    this.setState(getStateFromStore())
  }
})
