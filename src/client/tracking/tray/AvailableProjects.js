import React, {Component, PropTypes} from 'react'
import AvailableProject from './AvailableProject'
import _ from 'lodash'
import Shortcut from '../../common/Shortcut'
import Messages from '../../common/messages/Messages'
import './available-projects.scss'

function projectName(project) {
  return project.name
}

class AvailableProjects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: null,
      errors: null,
      disableButtons: false
    }
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

    const updateFilter = (evt) => {
      if (_.isEmpty(_.trim(evt.target.value))) {
        this.setState({filter: null, errors: null, disableButtons: false})
      } else {
        try {
          const regEx = new RegExp(evt.target.value)
          this.setState({filter: regEx, errors: null, disableButtons: true})
        } catch (e) {
          this.setState({errors: [`Project filter not applied, ${e.message}`]})
        }
      }
    }

    const filteredProjects = this.props.projects.filter((value) => {
      return this.state.filter ? value.name.match(this.state.filter) : true
    })

    return (
      <fieldset className='available-projects'>
        <legend className='legend'>Available projects</legend>
        <div className='toggles'>
          <button className='include-all' onClick={includeAll} disabled={this.state.disableButtons}>
            <span className='icon-checkbox-checked'/>
            <span className='text-with-icon'>Include all</span>
            <Shortcut hotkeys={[`+ ${this.props.index}`, `= ${this.props.index}`]}/>
          </button>
          <button className='exclude-all' onClick={excludeAll} disabled={this.state.disableButtons}>
            <span className='icon-checkbox-unchecked'/>
            <span className='text-with-icon'>Exclude all</span>
            <Shortcut hotkeys={[`- ${this.props.index}`]}/>
          </button>
        </div>
        <span className='project-filter'>
          <label htmlFor='project-filter'>Filter projects</label>
          <input id='project-filter' type='text' onChange={updateFilter}/>
        </span>
        <Messages type='notification' messages={this.state.errors}/>
        <ol className='build-items'>
          {
            _.sortBy(filteredProjects, projectName).map((project) => {
              const included = _.indexOf(this.props.selectedProjects, project.projectId) >= 0
              const selectProject = (included) => {
                if (included) {
                  this.props.selectProject(this.props.trayId, [project.projectId])
                } else {
                  this.props.removeProject(this.props.trayId, [project.projectId])
                }
              }

              return <AvailableProject key={project.webUrl}
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
  projects: PropTypes.arrayOf(PropTypes.shape({
    projectId: PropTypes.string.isRequired,
    webUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isNew: PropTypes.bool.isRequired,
    wasRemoved: PropTypes.bool.isRequired
  })).isRequired,
  selectedProjects: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectProject: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired
}

export default AvailableProjects
