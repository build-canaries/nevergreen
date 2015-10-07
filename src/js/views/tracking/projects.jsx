var React = require('react')
var AvailableProject = require('./availableProject')
var _ = require('lodash')
var SelectedProjectsStore = require('../../stores/SelectedProjectsStore')
var SelectProjectActions = require('../../actions/SelectProjectActions')
var FetchedProjectsStore = require('../../stores/FetchedProjectsStore')

function projectName(project) {
  return project.name
}

function getStateFromStore(trayId) {
  return {
    projects: FetchedProjectsStore.getAll(trayId),
    selectedProjects: SelectedProjectsStore.getForTray(trayId)
  }
}

module.exports = React.createClass({
  propTypes: {
    trayId: React.PropTypes.string.isRequired,
    refreshTray: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return getStateFromStore(this.props.trayId)
  },

  componentDidMount: function () {
    SelectedProjectsStore.addListener(this._onChange)
    FetchedProjectsStore.addListener(this._onChange)
  },

  componentWillUnmount: function () {
    SelectedProjectsStore.removeListener(this._onChange)
    FetchedProjectsStore.removeListener(this._onChange)
  },

  render: function () {
    return (
      <fieldset className='tracking-cctray-group-builds tray-content'>
        <legend className='tracking-cctray-group-builds-legend'>Available Projects</legend>
        <div className='tracking-cctray-group-build-toggles'>
          <button className='testing-include-all button' onClick={this._includeAll}>
            <span className='icon-checkbox-checked'></span>
            <span className='text-with-icon'>Include all</span>
          </button>
          <button className='button' onClick={this._excludeAll}>
            <span className='icon-checkbox-unchecked'></span>
            <span className='text-with-icon'>Exclude all</span>
          </button>
          <button className='button' onClick={this.props.refreshTray}>
            <span className='icon-loop2'></span>
            <span className='text-with-icon'>Refresh</span>
          </button>
        </div>
        <div className='testing-projects tracking-cctray-group-build-items'>
          {
            _.sortBy(this.state.projects, projectName).map(function (project) {
              var included = _.indexOf(this.state.selectedProjects, project.id) >= 0

              return <AvailableProject key={project.id}
                                       name={project.name}
                                       included={included}
                                       wasRemoved={project.wasRemoved}
                                       isNew={project.isNew}
                                       selectProject={this._selectProject.bind(this, project.id)}/>
            }, this)
          }
        </div>
      </fieldset>
    )
  },

  _selectProject: function (projectId, included) {
    if (included) {
      SelectProjectActions.selectProject(this.props.trayId, [projectId])
    } else {
      SelectProjectActions.removeProject(this.props.trayId, [projectId])
    }
  },

  _includeAll: function () {
    var projectIds = this.state.projects
      .filter(function (project) {
        return !project.wasRemoved
      }).map(function (project) {
        return project.id
      })
    SelectProjectActions.selectProject(this.props.trayId, projectIds)
  },

  _excludeAll: function () {
    var projectIds = this.state.projects.map(function (project) {
      return project.id
    })
    SelectProjectActions.removeProject(this.props.trayId, projectIds)
  },

  _onChange: function () {
    if (this.isMounted()) {
      this.setState(getStateFromStore(this.props.trayId))
    }
  }
})
