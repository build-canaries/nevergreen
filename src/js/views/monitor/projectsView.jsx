var $ = require('jquery')
var React = require('react')
var styler = require('../../controllers/styler')

var InterestingProject = React.createClass({
  propTypes: {
    prognosis: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <li className={'monitor-project monitor-' + this.props.prognosis}>
        <div className='monitor-outer-container'>
          <div className='monitor-inner-container'>{this.props.name}</div>
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
            return <InterestingProject key={project.id} prognosis={project.prognosis} name={project.name}/>
          })
        }
      </ul>
    )
  },

  componentDidMount: function () {
    var $node = $(React.findDOMNode(this))
    styler.styleProjects(this.props.projects, $node.find('.monitor-outer-container'), $node)
  },

  componentDidUpdate: function () {
    var $node = $(React.findDOMNode(this))
    styler.styleProjects(this.props.projects, $node.find('.monitor-outer-container'), $node)
  }
})
