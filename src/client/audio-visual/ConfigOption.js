import React, {Component, PropTypes} from 'react'

class ConfigOption extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const onChange = (event) => this.props.onToggle(event.target.checked)

    return (
      <p className='checkbox-container'>
        <label className='label-checkbox'>
          <input className='checkbox no-text-selection'
                 type='checkbox'
                 checked={this.props.enabled}
                 onChange={onChange}/>
          <span>{this.props.name}</span>
        </label>
      </p>
    )
  }
}

ConfigOption.propTypes = {
  name: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
}

export default ConfigOption
