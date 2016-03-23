const React = require('react')

module.exports = React.createClass({
  displayName: 'AvailableProject',

  propTypes: {
    name: React.PropTypes.string.isRequired,
    isNew: React.PropTypes.bool.isRequired,
    wasRemoved: React.PropTypes.bool.isRequired,
    included: React.PropTypes.bool.isRequired,
    selectProject: React.PropTypes.func.isRequired
  },

  render() {
    const labelClass = this.props.wasRemoved ? 'label-checkbox-disabled' : 'label-checkbox'
    const nameClass = this.props.wasRemoved ? 'tracking-removed-project' : ''
    let info = ''

    if (this.props.isNew) {
      info = <sup className='tracking-new-info'>new</sup>
    } else if (this.props.wasRemoved) {
      info = <sup className='tracking-removed-info'>removed</sup>
    }

    return (
      <li className='checkbox-container'>
        <label className={labelClass}>
          <input ref='toggleIncluded'
                 className='checkbox no-text-selection'
                 type='checkbox'
                 checked={this.props.included}
                 onChange={this._onChange}
                 disabled={this.props.wasRemoved}/>
          <span className={nameClass}>{this.props.name}</span>
          {info}
        </label>
      </li>
    )
  },

  _onChange(event) {
    this.props.selectProject(event.target.checked)
  }
})
