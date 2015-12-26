const React = require('react')

module.exports = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    enabled: React.PropTypes.bool.isRequired,
    onToggle: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <p className='checkbox-container'>
        <label className='label-checkbox'>
          <input ref='toggleIncluded'
                 className='checkbox no-text-selection'
                 type='checkbox'
                 checked={this.props.enabled}
                 onChange={this._onChange}/>
          <span className=''>{this.props.name}</span>
        </label>
      </p>
    )
  },

  _onChange(event) {
    this.props.onToggle(event.target.checked)
  }
})
