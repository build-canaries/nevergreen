const React = require('react')
const AvailableProject = require('./availableProject')
const _ = require('lodash')
const Shortcut = require('../general/Shortcut')
const SelectedProjectsStore = require('../../stores/SelectedProjectsStore')
const SelectProjectActions = require('../../actions/SelectProjectActions')
const FetchedProjectsStore = require('../../stores/FetchedProjectsStore')

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
  displayName: 'Projects',

  propTypes: {
    index: React.PropTypes.number.isRequired,
    trayId: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return getStateFromStore(this.props.trayId)
  },

  componentDidMount() {
    SelectedProjectsStore.addListener(this._onChange)
    FetchedProjectsStore.addListener(this._onChange)
  },

  componentWillUnmount() {
    SelectedProjectsStore.removeListener(this._onChange)
    FetchedProjectsStore.removeListener(this._onChange)
  },

  render() {
    return (
      <fieldset className='tracking-cctray-group-builds'>
        <legend className='tracking-cctray-group-builds-legend'>Available projects</legend>
        <div className='tracking-cctray-group-build-toggles'>
          <Shortcut hotkeys={[`+ ${this.props.index}`]}>
            <button className='testing-include-all button' onClick={this._includeAll}>
              <span className='icon-checkbox-checked'/>
              <span className='text-with-icon'>Include all</span>
            </button>
          </Shortcut>
          <Shortcut hotkeys={[`- ${this.props.index}`]}>
            <button className='button' onClick={this._excludeAll}>
              <span className='icon-checkbox-unchecked'/>
              <span className='text-with-icon'>Exclude all</span>
            </button>
          </Shortcut>
        </div>
        <div className='testing-projects tracking-cctray-group-build-items'>
          {
            _.sortBy(this.state.projects, projectName).map(project => {
              const included = _.indexOf(this.state.selectedProjects, project.projectId) >= 0

              return <AvailableProject key={project.projectId}
                                       name={project.name}
                                       included={included}
                                       wasRemoved={project.wasRemoved}
                                       isNew={project.isNew}
                                       selectProject={this._selectProject.bind(this, project.projectId)}/>
            })
          }
        </div>
      </fieldset>
    )
  },

  _selectProject(projectId, included) {
    if (included) {
      SelectProjectActions.selectProject(this.props.trayId, [projectId])
    } else {
      SelectProjectActions.removeProject(this.props.trayId, [projectId])
    }
  },

  _includeAll() {
    const projectIds = this.state.projects.filter(project => {
      return !project.wasRemoved
    }).map(project => {
      return project.projectId
    })
    SelectProjectActions.selectProject(this.props.trayId, projectIds)
  },

  _excludeAll() {
    const projectIds = this.state.projects.map(project => {
      return project.projectId
    })
    SelectProjectActions.removeProject(this.props.trayId, projectIds)
  },

  _onChange() {
    this.setState(getStateFromStore(this.props.trayId))
  }
})
