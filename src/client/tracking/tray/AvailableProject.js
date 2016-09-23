import React, {Component, PropTypes} from 'react'
import './available-project.scss'

class AvailableProject extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const labelClass = this.props.removed ? 'label-checkbox-disabled' : 'label-checkbox'
    const nameClass = this.props.removed ? 'removed-project' : ''
    let info = null

    if (this.props.isNew) {
      info = <sup className='new-project'>new</sup>
    } else if (this.props.removed) {
      info = <sup className='removed-project'>removed</sup>
    }

    return (
      <li className='available-project checkbox-container'>
        <label className={labelClass}>
          <input className='checkbox no-text-selection'
                 type='checkbox'
                 checked={this.props.selected || false}
                 onChange={this.props.selectProject}
                 disabled={this.props.removed}/>
          <span className={nameClass}>{this.props.name}</span>
          {info}
        </label>
      </li>
    )
  }
}

AvailableProject.propTypes = {
  name: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  removed: PropTypes.bool,
  selected: PropTypes.bool,
  selectProject: PropTypes.func.isRequired
}

export default AvailableProject
