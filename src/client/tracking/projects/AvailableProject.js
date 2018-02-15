import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Checkbox from '../../common/forms/Checkbox'
import styles from './available-project.scss'
import {isBlank} from '../../common/Utils'

class AvailableProject extends Component {
  render() {
    const listClasses = classNames(styles.availableProject, {[styles.removedProject]: this.props.removed})
    let info = null

    if (this.props.isNew) {
      info = <div className={styles.infoNew} data-locator='new'>new</div>
    } else if (this.props.removed) {
      info = <div className={styles.infoRemoved} data-locator='removed'>removed</div>
    }

    const displayName = isBlank(this.props.stage) ? this.props.name : `${this.props.name} ${this.props.stage}`

    return (
      <li className={listClasses}>
        <Checkbox checked={this.props.selected}
                  onToggle={this.props.selectProject}
                  disabled={this.props.removed}>
          {info}
          <div className={styles.name} data-locator='name'>{displayName}</div>
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
