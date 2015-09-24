var $ = require('jquery')
var React = require('react')
var InterestingProjects = require('./projectsView')
var Success = require('./successView')
var Loading = require('../general/loading')
var InterestingProjectsStore = require('../../stores/InterestingProjectsStore')
var InterestingProjectActions = require('../../actions/InterestingProjectActions')
var TrayStore = require('../../stores/TrayStore')
var SelectedProjectsStore = require('../../stores/SelectedProjectsStore')

function getStateFromStore() {
  return {
    projects: InterestingProjectsStore.getAll(),
    loaded: true
  }
}

module.exports = React.createClass({
  getInitialState: function () {
    return {
      projects: [],
      loaded: false
    }
  },

  render: function () {
    var content
    if (!this.state.loaded) {
      content = <Loading />

    } else if (this._hasProjects()) {
      content = <InterestingProjects projects={this.state.projects}/>

    } else {
      content = <Success />
    }

    return (
      <div className='monitor' onMouseMove={this._animateMenu}>{content}</div>
    )
  },

  componentDidMount: function () {
    InterestingProjectsStore.addListener(this._onChange)
    InterestingProjectActions.fetchInteresting(TrayStore.getAll(), SelectedProjectsStore.getAll())

    var updateTimer = setInterval(function () {
      InterestingProjectActions.fetchInteresting(TrayStore.getAll(), SelectedProjectsStore.getAll())
    }, 5000)

    this.setState({timer: updateTimer})
    this._hideMenu()
  },

  componentWillUnmount: function () {
    InterestingProjectsStore.removeListener(this._onChange)

    clearInterval(this.state.timer)
    this._clearMenuTimeOut()
    this._showMenu()
  },

  _hasProjects: function () {
    return this.state.projects.length > 0
  },

  _animateMenu: function () {
    this._clearMenuTimeOut()
    this._showMenu()
    this.setState({
      menuTimer: setInterval(function () {
        this._hideMenu()
      }.bind(this), 3000)
    })
  },

  _showMenu: function () {
    $('#menu .navigation, .content-info')
      .removeClass('navigation-hide')
      .addClass('navigation-show')
  },

  _hideMenu: function () {
    if (this.isMounted()) {
      $('#menu .navigation, .content-info')
        .removeClass('navigation-show')
        .addClass('navigation-hide')
    }
  },

  _clearMenuTimeOut: function () {
    clearInterval(this.state.menuTimer)
  },

  _onChange: function () {
    this.setState(getStateFromStore())
  }
})
