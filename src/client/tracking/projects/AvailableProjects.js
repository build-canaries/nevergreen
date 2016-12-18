import React, {Component, PropTypes} from 'react'
import AvailableProject from './AvailableProject'
import _ from 'lodash'
import ShortcutContainer from '../../common/shortcut/ShortcutContainer'
import Messages from '../../common/messages/Messages'
import './available-projects.scss'

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
      this.props.projects
        .filter((project) => !project.removed)
        .forEach((project) => this.props.selectProject(this.props.trayId, project.projectId, true))
    }

    const excludeAll = () => {
      this.props.projects.forEach((project) => {
        this.props.selectProject(this.props.trayId, project.projectId, false)
      })
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
      <fieldset className='available-projects' data-locator='available-projects'>
        <legend className='legend'>Available projects</legend>
        <div className='toggles'>
          <button className='include-all' onClick={includeAll} disabled={this.state.disableButtons}
                  data-locator='include-all'>
            <span className='icon-checkbox-checked'/>
            <span className='text-with-icon'>Include all</span>
            <ShortcutContainer hotkeys={[`+ ${this.props.index}`, `= ${this.props.index}`]}/>
          </button>
          <button className='exclude-all' onClick={excludeAll} disabled={this.state.disableButtons}>
            <span className='icon-checkbox-unchecked'/>
            <span className='text-with-icon'>Exclude all</span>
            <ShortcutContainer hotkeys={[`- ${this.props.index}`]}/>
          </button>
        </div>
        <span className='project-filter'>
          <label htmlFor='project-filter'>Filter projects</label>
          <input id='project-filter' type='text' onChange={updateFilter}/>
        </span>
        <Messages type='notification' messages={this.state.errors}/>
        <ol className='build-items'>
          {
            _.sortBy(filteredProjects, ['name', 'stage']).map((project) => {
              const selected = this.props.selected.includes(project.projectId)
              const selectProject = () => {
                this.props.selectProject(this.props.trayId, project.projectId, !selected)
              }

              return <AvailableProject key={project.projectId} {...project} selected={selected}
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
    name: PropTypes.string.isRequired,
    stage: PropTypes.string
  })).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectProject: PropTypes.func.isRequired
}

export default AvailableProjects
