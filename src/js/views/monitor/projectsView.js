import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import styler from '../../controllers/styler'
import InterestingProject from './InterestingProject'
import DisplayStore from '../../stores/DisplayStore'

class Projects extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul id='interesting-projects' className='monitor-projects'>
        {
          this.props.projects.map((project) => {
            return <InterestingProject {...project} key={project.projectId}
                                                    showBrokenBuildTimers={DisplayStore.areBrokenBuildTimersEnabled()}
                                                    playBrokenBuildSounds={DisplayStore.areBrokenBuildSoundsEnabled()}
                                                    brokenBuildFx={DisplayStore.brokenBuildSoundFx()}/>
          })
        }
      </ul>
    )
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this)
    styler.styleProjects(this.props.projects, node.querySelectorAll('.monitor-outer-container'), node)
  }

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this)
    styler.styleProjects(this.props.projects, node.querySelectorAll('.monitor-outer-container'), node)
  }
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Projects
