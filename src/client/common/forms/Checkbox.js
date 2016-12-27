import React, {Component, PropTypes} from 'react'
import _ from 'lodash'
import './checkbox.scss'

class Checkbox extends Component {
  render() {
    const inputProps = _.omit(this.props, ['label', 'enabled', 'onToggle'])
    const onChange = (event) => this.props.onToggle(event.target.checked)
    const checked = this.props.enabled || false

    return (
      <label className='label-checkbox'>
        <input className='checkbox' type='checkbox' checked={checked} onChange={onChange} {...inputProps}/>
        <span>{this.props.label}</span>
      </label>
    )
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  onToggle: PropTypes.func.isRequired
}

export default Checkbox
