import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AvailableProject from './AvailableProject'
import Messages from '../../common/messages/Messages'
import Input from '../../common/forms/Input'
import Shortcut from '../../common/Shortcut'
import Refresh from './Refresh'
import _ from 'lodash'
import styles from './available-projects.scss'
import {isBlank} from '../../common/Utils'

class AvailableProjects extends Component {
  constructor(props) {
    super(props)
    this.state = {filter: null, filterErrors: null, disableButtons: false}
  }

  includeAll = () => {
    this.props.projects
      .filter((project) => !project.removed)
      .forEach((project) => this.props.selectProject(this.props.trayId, project.projectId, true))
  }

  excludeAll = () => {
    this.props.projects.forEach((project) => {
      this.props.selectProject(this.props.trayId, project.projectId, false)
    })
  }

  updateFilter = (evt) => {
    if (isBlank(evt.target.value)) {
      this.setState({filter: null, filterErrors: null, disableButtons: false})
    } else {
      try {
        const regEx = new RegExp(evt.target.value)
        this.setState({filter: regEx, filterErrors: null, disableButtons: true})
      } catch (e) {
        this.setState({filterErrors: [`Project filter not applied, ${e.message}`]})
      }
    }
  }

  scrollToTop = () => {
    this.node.scrollIntoView()
  }

  refreshTray = () => {
    this.props.refreshTray(this.props, this.props.pendingRequest)
  }

  render() {
    const filteredProjects = this.props.projects.filter((project) => {
      return this.state.filter ? `${project.name} ${project.stage || ''}`.match(this.state.filter) : true
    })

    const controls = (
      <div className={styles.controls}>
        <fieldset className={styles.toggles}>
          <legend className={styles.legend}>Available projects</legend>
          <button className={styles.includeAll} onClick={this.includeAll} disabled={this.state.disableButtons}
                  data-locator='include-all'>
            include all
            <Shortcut hotkeys={[`+ ${this.props.index}`, `= ${this.props.index}`]}/>
          </button>
          <button className={styles.excludeAll} onClick={this.excludeAll} disabled={this.state.disableButtons}>
            exclude all
            <Shortcut hotkeys={[`- ${this.props.index}`]}/>
          </button>
        </fieldset>
        <div className={styles.projectFilter}>
          <Input className={styles.projectFilterInput} onChange={this.updateFilter} placeholder='regex'>
            <span>filter</span>
          </Input>
        </div>
        <Messages type='error' messages={this.state.filterErrors}/>
      </div>
    )

    const buildItems = (
      <ol className={styles.buildItems} aria-live='polite' aria-relevant='additions'>
        {
          _.sortBy(filteredProjects, ['name', 'stage']).map((project) => {
            const selected = this.props.selected.includes(project.projectId)
            const selectProject = () => this.props.selectProject(this.props.trayId, project.projectId, !selected)

            return <AvailableProject key={project.projectId} {...project} selected={selected}
                                     selectProject={selectProject}/>
          })
        }
      </ol>
    )

    return (
      <section className={styles.availableProjects} data-locator='available-projects' ref={(node) => this.node = node}>
        <Refresh index={this.props.index} timestamp={this.props.timestamp} refreshTray={this.refreshTray}/>
        <Messages type='error' messages={this.props.errors}/>
        {this.props.errors ? null : controls}
        {this.props.errors ? null : buildItems}
        {this.props.errors ? null :
          <button className={styles.backToTop} onClick={this.scrollToTop}>back to top</button>}
      </section>
    )
  }
}

AvailableProjects.propTypes = {
  trayId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  url: PropTypes.string.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  serverType: PropTypes.string,
  projects: PropTypes.arrayOf(PropTypes.shape({
    projectId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    stage: PropTypes.string
  })).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectProject: PropTypes.func.isRequired,
  timestamp: PropTypes.string,
  refreshTray: PropTypes.func.isRequired,
  pendingRequest: PropTypes.object
}

export default AvailableProjects
