import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ScaledGrid from '../common/scale/ScaledGrid'
import InterestingProject from '../common/project/InterestingProject'
import './interesting-projects.scss'

class InterestingProjects extends Component {
  componentWillUnmount() {
    if (this.sfx) {
      this.sfx.pause()
    }
  }

  render() {
    const playBrokenSfx = this.props.playBrokenBuildSounds && this.props.projects.reduce((previous, project) => {
        return previous || project.prognosis === 'sick'
      }, false)
    const brokenSfx = playBrokenSfx && this.props.brokenBuildFx ? <audio ref={(node) => this.sfx = node} src={this.props.brokenBuildFx} autoPlay/> : null

    return (
      <span className='interesting-projects' data-locator='interesting-projects'>
        <ScaledGrid>
          {
            this.props.projects.map((project) => {
              const tray = this.props.trays.find((tray) => tray.trayId === project.trayId)
              return <InterestingProject {...project} trayName={tray.name} key={project.projectId}
                                         showBrokenBuildTimers={this.props.showBrokenBuildTimers}
                                         showTrayName={this.props.showTrayName}
                                         showBrokenBuildLabel={this.props.showBrokenBuildLabel}/>
            })
          }
        </ScaledGrid>
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
  brokenBuildFx: PropTypes.string,
  showBrokenBuildLabel: PropTypes.bool
}

export default InterestingProjects
