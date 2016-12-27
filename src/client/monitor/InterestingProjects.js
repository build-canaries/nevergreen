import React, {Component, PropTypes} from 'react'
import {styleProjects} from './Styler'
import InterestingProject from './InterestingProject'
import './interesting-projects.scss'

class InterestingProjects extends Component {
  componentDidMount() {
    const node = this.node.querySelector('#interesting-projects')
    styleProjects(this.props.projects, node.querySelectorAll('.monitor-outer-container'), node)
  }

  componentWillUnmount() {
    if (this.refs.sfx) {
      this.refs.sfx.pause()
    }
  }

  componentDidUpdate() {
    const node = this.node.querySelector('#interesting-projects')
    styleProjects(this.props.projects, node.querySelectorAll('.monitor-outer-container'), node)
  }

  render() {
    const playBrokenSfx = this.props.playBrokenBuildSounds && this.props.projects.reduce((previous, project) => {
        return previous || project.prognosis === 'sick'
      }, false)
    const brokenSfx = playBrokenSfx ? <audio ref='sfx' src={this.props.brokenBuildFx} autoPlay/> : null

    return (
      <span className='interesting-projects' data-locator='interesting-projects' ref={(node) => this.node = node}>
        <ul id='interesting-projects' className='projects'>
          {
            this.props.projects.map((project) => {
              const tray = this.props.trays.find((tray) => tray.trayId === project.trayId)
              return <InterestingProject {...project} trayName={tray.name} key={project.projectId}
                                         showBrokenBuildTimers={this.props.showBrokenBuildTimers}
                                         showTrayName={this.props.showTrayName}/>
            })
          }
        </ul>
        {brokenSfx}
      </span>
    )
  }
}

InterestingProjects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    projectId: PropTypes.string.isRequired
  })).isRequired,
  trays: PropTypes.arrayOf(PropTypes.object).isRequired,
  showBrokenBuildTimers: PropTypes.bool,
  showTrayName: PropTypes.bool,
  playBrokenBuildSounds: PropTypes.bool,
  brokenBuildFx: PropTypes.string
}

export default InterestingProjects
