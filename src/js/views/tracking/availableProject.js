const React = require('react')

module.exports = React.createClass({
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
      info = <sup className='tracking-new-project'> new</sup>
    } else if (this.props.wasRemoved) {
      info = <sup> removed</sup>
    }

    return (
      <p className='checkbox-container'>
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
      </p>
    )
  },

  _onChange(event) {
    this.props.selectProject(event.target.checked)
  }
})
