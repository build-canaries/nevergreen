import React, {Component, PropTypes} from 'react'
import AvailableProject from './availableProject'
import _ from 'lodash'
import Shortcut from '../general/Shortcut'
import SelectedProjectsStore from '../../stores/SelectedProjectsStore'
import SelectProjectActions from '../../actions/SelectProjectActions'
import FetchedProjectsStore from '../../stores/FetchedProjectsStore'

function projectName(project) {
  return project.name
}

function getStateFromStore(trayId) {
  return {
    projects: FetchedProjectsStore.getAll(trayId),
    selectedProjects: SelectedProjectsStore.getForTray(trayId)
  }
}

class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = getStateFromStore(props.trayId)
  }

  componentDidMount() {
    const callback = () => this.setState(getStateFromStore(this.props.trayId))
    this.setState({callback})

    SelectedProjectsStore.addListener(callback)
    FetchedProjectsStore.addListener(callback)
  }

  componentWillUnmount() {
    SelectedProjectsStore.removeListener(this.state.callback)
    FetchedProjectsStore.removeListener(this.state.callback)
  }

  render() {
    return (
      <fieldset className='tracking-cctray-group-builds'>
        <legend className='tracking-cctray-group-builds-legend'>Available projects</legend>
        <div className='tracking-cctray-group-build-toggles'>
          <button className='testing-include-all button' onClick={this._includeAll.bind(this)}>
            <span className='icon-checkbox-checked'/>
            <span className='text-with-icon'>Include all</span>
            <Shortcut hotkeys={[`+ ${this.props.index}`, `= ${this.props.index}`]}/>
          </button>
          <button className='button' onClick={this._excludeAll.bind(this)}>
            <span className='icon-checkbox-unchecked'/>
            <span className='text-with-icon'>Exclude all</span>
            <Shortcut hotkeys={[`- ${this.props.index}`]}/>
          </button>
        </div>
        <ol className='testing-projects tracking-cctray-group-build-items'>
          {
            _.sortBy(this.state.projects, projectName).map((project) => {
              const included = _.indexOf(this.state.selectedProjects, project.projectId) >= 0

              return <AvailableProject key={project.projectId}
                                       name={project.name}
                                       included={included}
                                       wasRemoved={project.wasRemoved}
                                       isNew={project.isNew}
                                       selectProject={this._selectProject.bind(this, project.projectId)}/>
            })
          }
        </ol>
      </fieldset>
    )
  }

  _selectProject(projectId, included) {
    if (included) {
      SelectProjectActions.selectProject(this.props.trayId, [projectId])
    } else {
      SelectProjectActions.removeProject(this.props.trayId, [projectId])
    }
  }

  _includeAll() {
    const projectIds = this.state.projects.filter((project) => {
      return !project.wasRemoved
    }).map((project) => {
      return project.projectId
    })
    SelectProjectActions.selectProject(this.props.trayId, projectIds)
  }

  _excludeAll() {
    const projectIds = this.state.projects.map((project) => {
      return project.projectId
    })
    SelectProjectActions.removeProject(this.props.trayId, projectIds)
  }
}

Projects.propTypes = {
  index: PropTypes.number.isRequired,
  trayId: PropTypes.string.isRequired
}

export default Projects
