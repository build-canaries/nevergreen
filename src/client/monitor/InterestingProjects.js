import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {styleProjects} from './Styler'
import InterestingProject from './InterestingProject'
import './interesting-projects.scss'

class InterestingProjects extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this).querySelector('#interesting-projects')
    styleProjects(this.props.projects, node.querySelectorAll('.monitor-outer-container'), node)
  }

  componentWillUnmount() {
    if (this.refs.sfx) {
      this.refs.sfx.pause()
    }
  }

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this).querySelector('#interesting-projects')
    styleProjects(this.props.projects, node.querySelectorAll('.monitor-outer-container'), node)
  }

  render() {
    const playBrokenSfx = this.props.playBrokenBuildSounds && this.props.projects.reduce((previous, project) => {
        return previous || project.prognosis === 'sick'
      }, false)
    const brokenSfx = playBrokenSfx ? <audio ref='sfx' src={this.props.brokenBuildFx} autoPlay/> : null

    return (
      <span className='interesting-projects'>
        <ul id='interesting-projects' className='projects'>
          {
            this.props.projects.map((project) => {
              return <InterestingProject {...project} key={project.webUrl}
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
    webUrl: PropTypes.string.isRequired
  })).isRequired,
  showBrokenBuildTimers: PropTypes.bool,
  showTrayName: PropTypes.bool,
  playBrokenBuildSounds: PropTypes.bool,
  brokenBuildFx: PropTypes.string
}

export default InterestingProjects
