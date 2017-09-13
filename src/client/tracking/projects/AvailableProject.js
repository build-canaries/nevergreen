import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Checkbox from '../../common/forms/Checkbox'
import styles from './available-project.scss'

class AvailableProject extends Component {
  render() {
    const listClasses = classNames(styles.availableProject, {[styles.removedProject]: this.props.removed})
    let info = null

    if (this.props.isNew) {
      info = <sup className={styles.newProject} data-locator='new'>new</sup>
    } else if (this.props.removed) {
      info = <sup data-locator='removed'>removed</sup>
    }

    const displayName = this.props.stage ? `${this.props.name} ${this.props.stage}` : this.props.name

    return (
      <li className={listClasses}>
        <Checkbox checked={this.props.selected} onToggle={this.props.selectProject} disabled={this.props.removed}>
          <span data-locator='name'>{displayName}</span>
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
