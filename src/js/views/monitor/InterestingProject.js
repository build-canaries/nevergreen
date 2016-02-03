const React = require('react')
const moment = require('moment')
const _ = require('lodash')

module.exports = React.createClass({
  displayName: 'InterestingProject',

  propTypes: {
    prognosis: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    lastBuildTime: React.PropTypes.string.isRequired,
    showBrokenBuildTimers: React.PropTypes.bool.isRequired
  },

  _isSick() {
    return this.props.prognosis === 'sick'
  },

  _toRelativeTime(time) {
    return _.isEmpty(_.trim(time)) ? '??' : moment(time).fromNow(true)
  },

  _brokenBuildTimer() {
    if (this.props.showBrokenBuildTimers && this._isSick()) {
      return <span className='monitor-time-broken'> {this._toRelativeTime(this.props.lastBuildTime)}</span>
    }
  },

  render() {
    return (
      <li className={'monitor-project monitor-' + this.props.prognosis}>
        <div className='monitor-outer-container'>
          <div className='monitor-inner-container'>
            <span className='monitor-project-name'>{this.props.name}</span>
            {this._brokenBuildTimer()}
          </div>
        </div>
      </li>
    )
  }
})