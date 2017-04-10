import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Checkbox from '../../common/forms/Checkbox'
import './available-project.scss'

class AvailableProject extends Component {
  render() {
    const listClasses = classNames('available-project', {'removed-project': this.props.removed})
    let info = null

    if (this.props.isNew) {
      info = <sup className='new-project'>new</sup>
    } else if (this.props.removed) {
      info = <sup>removed</sup>
    }

    const displayName = this.props.stage ? `${this.props.name} ${this.props.stage}` : this.props.name

    return (
      <li className={listClasses}>
        <Checkbox enabled={this.props.selected} onToggle={this.props.selectProject} disabled={this.props.removed}>
          <span>{displayName}</span>
          {info}
        </Checkbox>
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
