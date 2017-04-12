import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './checkbox.scss'

class Checkbox extends Component {
  render() {
    const inputProps = _.omit(this.props, ['children', 'onToggle'])
    const onChange = (event) => this.props.onToggle(event.target.checked)

    return (
      <label className='checkbox'>
        <input type='checkbox' onChange={onChange} {...inputProps}/>
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
  onToggle: PropTypes.func.isRequired
}

export default Checkbox
