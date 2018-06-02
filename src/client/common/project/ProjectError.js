import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './project-error.scss'
import interestingProjectStyles from './interesting-project.scss'
import classNames from 'classnames'

class ProjectError extends Component {
  render() {
    const classes = classNames(interestingProjectStyles.interestingProject, styles.error)
    return (
      <div className={classes}>
        <div className={interestingProjectStyles.inner}>{this.props.error}</div>
      </div>
    )
  }
}

ProjectError.propTypes = {
  error: PropTypes.string.isRequired
}

export default ProjectError
