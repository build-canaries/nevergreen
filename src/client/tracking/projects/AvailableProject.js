import React, {Component, PropTypes} from 'react'
import Checkbox from '../../common/forms/Checkbox'
import './available-project.scss'

class AvailableProject extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const nameClass = this.props.removed ? 'removed-project' : ''
    let info = null

    if (this.props.isNew) {
      info = <sup className='new-project'>new</sup>
    } else if (this.props.removed) {
      info = <sup>removed</sup>
    }

    const displayName = this.props.stage ? `${this.props.name} ${this.props.stage}` : this.props.name

    return (
      <li className={`available-project ${nameClass}`}>
        <Checkbox label={displayName} enabled={this.props.selected || false} onToggle={this.props.selectProject}
                  disabled={this.props.removed}/>
        {info}
      </li>
    )
  }
}

AvailableProject.propTypes = {
  name: PropTypes.string.isRequired,
  stage: PropTypes.string,
  isNew: PropTypes.bool,
  removed: PropTypes.bool,
  selected: PropTypes.bool,
  selectProject: PropTypes.func.isRequired
}

export default AvailableProject
