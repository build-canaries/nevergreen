import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './project-summary.scss'
import interestingProjectStyles from './interesting-project.scss'
import classNames from 'classnames'

class ProjectSummary extends Component {
  render() {
    const classes = classNames(interestingProjectStyles.interestingProject, styles.summary)
    return (
      <div className={classes}>
        <div className={interestingProjectStyles.inner}>+{this.props.additionalProjectsCount} additional projects</div>
      </div>
    )
  }
}

ProjectSummary.propTypes = {
  additionalProjectsCount: PropTypes.number.isRequired
}

export default ProjectSummary
