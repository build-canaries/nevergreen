import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './checkbox.scss'

class Checkbox extends Component {
  render() {
    const inputProps = _.omit(this.props, ['children', 'enabled', 'onToggle'])
    const onChange = (event) => this.props.onToggle(event.target.checked)
    const checked = this.props.enabled || false

    return (
      <label className='label-checkbox'>
        <input className='checkbox' type='checkbox' checked={checked} onChange={onChange} {...inputProps}/>
        {this.props.children}
      </label>
    )
  }
}

Checkbox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  enabled: PropTypes.bool,
  onToggle: PropTypes.func.isRequired
}

export default Checkbox
