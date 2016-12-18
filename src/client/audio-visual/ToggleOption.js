import React, {Component, PropTypes} from 'react'

class ToggleOption extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const onChange = (event) => this.props.onToggle(event.target.checked)

    return (
      <p className='checkbox-container'>
        <label className='label-checkbox'>
          <input className='checkbox no-text-selection' type='checkbox' checked={this.props.enabled}
                 onChange={onChange} data-locator={this.props.locator}/>
          <span>{this.props.name}</span>
        </label>
      </p>
    )
  }
}

ToggleOption.propTypes = {
  name: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  locator: PropTypes.string
}

export default ToggleOption
