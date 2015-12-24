const $ = require('jquery')
const React = require('react')
const ReactDOM = require('react-dom')
const styler = require('../../controllers/styler')
const ConfigurationStore = require('../../stores/ConfigurationStore')
const moment = require('moment')

moment.locale('en', {
  relativeTime: {
    future: '%s',
    past: '%s',
    s: '<1m',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1mo',
    MM: '%dmo',
    y: '1y',
    yy: '%dy'
  }
})

const InterestingProject = React.createClass({
  propTypes: {
    prognosis: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    lastBuildTime: React.PropTypes.string.isRequired
  },

  _isSick: function () {
    return this.props.prognosis === 'sick'
  },

  _toRelativeTime: function (time) {
    return moment(time).fromNow(true)
  },

  _brokenBuildTimer: function () {
    if (ConfigurationStore.areBrokenBuildTimersEnabled() && this._isSick()) {
      return <span className='monitor-time-broken'> {this._toRelativeTime(this.props.lastBuildTime)}</span>
    }
  },

  render: function () {
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

  render: function () {
    return (
      <ul id='interesting-projects' className='monitor-projects'>
        {
          this.props.projects.map(function (project) {
            return <InterestingProject key={project.projectId} prognosis={project.prognosis} name={project.name} lastBuildTime={project.lastBuildTime}/>
          })
        }
      </ul>
    )
  },

  componentDidMount: function () {
    const $node = $(ReactDOM.findDOMNode(this))
    styler.styleProjects(this.props.projects, $node.find('.monitor-outer-container'), $node)
  },

  componentDidUpdate: function () {
    const $node = $(ReactDOM.findDOMNode(this))
    styler.styleProjects(this.props.projects, $node.find('.monitor-outer-container'), $node)
  }
})
