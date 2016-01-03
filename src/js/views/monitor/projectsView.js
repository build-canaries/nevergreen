const $ = require('jquery')
const React = require('react')
const ReactDOM = require('react-dom')
const styler = require('../../controllers/styler')
const DisplayStore = require('../../stores/DisplayStore')
const moment = require('moment')

const InterestingProject = React.createClass({
  propTypes: {
    prognosis: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    lastBuildTime: React.PropTypes.string.isRequired
  },

  _isSick() {
    return this.props.prognosis === 'sick'
  },

  _toRelativeTime(time) {
    return moment(time).fromNow(true)
  },

  _brokenBuildTimer() {
    if (DisplayStore.areBrokenBuildTimersEnabled() && this._isSick()) {
      return <span className='monitor-time-broken'> {this._toRelativeTime(this.props.lastBuildTime)}</span>
    }
  },

  render() {
    return (
      <li className={'monitor-project monitor-' + this.props.prognosis}>
        <div className='monitor-outer-container'>
          <div className='monitor-inner-container'>
            <span className="monitor-project-name">{this.props.name}</span>
            {this._brokenBuildTimer()}
          </div>
        </div>
      </li>
    )
  }

})

module.exports = React.createClass({
  propTypes: {
    projects: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },

  render() {
    return (
      <ul id='interesting-projects' className='monitor-projects'>
        {
          this.props.projects.map(project => {
            return <InterestingProject key={project.projectId}
                                       prognosis={project.prognosis}
                                       name={project.name}
                                       lastBuildTime={project.lastBuildTime}/>
          })
        }
      </ul>
    )
  },

  componentDidMount() {
    const $node = $(ReactDOM.findDOMNode(this))
    styler.styleProjects(this.props.projects, $node.find('.monitor-outer-container'), $node)
  },

  componentDidUpdate() {
    const $node = $(ReactDOM.findDOMNode(this))
    styler.styleProjects(this.props.projects, $node.find('.monitor-outer-container'), $node)
  }
})
