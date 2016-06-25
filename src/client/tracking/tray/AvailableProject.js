import React, {Component, PropTypes} from 'react'
import './available-project.scss'

class AvailableProject extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const toggle = (event) => this.props.selectProject(event.target.checked)
    const labelClass = this.props.wasRemoved ? 'label-checkbox-disabled' : 'label-checkbox'
    const nameClass = this.props.wasRemoved ? 'removed-project' : ''
    let info = null

    if (this.props.isNew) {
      info = <sup className='new-project'>new</sup>
    } else if (this.props.wasRemoved) {
      info = <sup className='removed-project'>removed</sup>
    }

    return (
      <li className='available-project checkbox-container'>
        <label className={labelClass}>
          <input className='checkbox no-text-selection'
                 type='checkbox'
                 checked={this.props.included}
                 onChange={toggle}
                 disabled={this.props.wasRemoved}/>
          <span className={nameClass}>{this.props.name}</span>
          {info}
        </label>
      </li>
    )
  }
}

AvailableProject.propTypes = {
  name: PropTypes.string.isRequired,
  isNew: PropTypes.bool.isRequired,
  wasRemoved: PropTypes.bool.isRequired,
  included: PropTypes.bool.isRequired,
  selectProject: PropTypes.func.isRequired
}

export default AvailableProject
