import React, {Component, PropTypes} from 'react'
import AvailableProject from './AvailableProject'
import _ from 'lodash'
import Shortcut from '../../common/Shortcut'
import './available-projects.scss'

function projectName(project) {
  return project.name
}

class AvailableProjects extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const includeAll = () => {
      const projectIds = this.props.projects.filter((project) => {
        return !project.wasRemoved
      }).map((project) => {
        return project.projectId
      })
      this.props.selectProject(this.props.trayId, projectIds)
    }

    const excludeAll = () => {
      const projectIds = this.props.projects.map((project) => {
        return project.projectId
      })
      this.props.removeProject(this.props.trayId, projectIds)
    }

    return (
      <fieldset className='available-projects'>
        <legend className='tracking-cctray-group-builds-legend'>Available projects</legend>
        <div className='tracking-cctray-group-build-toggles'>
          <button className='testing-include-all button' onClick={includeAll}>
            <span className='icon-checkbox-checked'/>
            <span className='text-with-icon'>Include all</span>
            <Shortcut hotkeys={[`+ ${this.props.index}`, `= ${this.props.index}`]}/>
          </button>
          <button className='button' onClick={excludeAll}>
            <span className='icon-checkbox-unchecked'/>
            <span className='text-with-icon'>Exclude all</span>
            <Shortcut hotkeys={[`- ${this.props.index}`]}/>
          </button>
        </div>
        <ol className='testing-projects tracking-cctray-group-build-items'>
          {
            _.sortBy(this.props.projects, projectName).map((project) => {
              const included = _.indexOf(this.props.selectedProjects, project.projectId) >= 0
              const selectProject = (included) => {
                if (included) {
                  this.props.selectProject(this.props.trayId, [project.projectId])
                } else {
                  this.props.removeProject(this.props.trayId, [project.projectId])
                }
              }

              return <AvailableProject key={project.projectId}
                                       name={project.name}
                                       included={included}
                                       wasRemoved={project.wasRemoved}
                                       isNew={project.isNew}
                                       selectProject={selectProject}/>
            })
          }
        </ol>
      </fieldset>
    )
  }
}

AvailableProjects.propTypes = {
  index: PropTypes.number.isRequired,
  trayId: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedProjects: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectProject: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired
}

export default AvailableProjects
