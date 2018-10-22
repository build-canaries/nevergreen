import React from 'react'
import PropTypes from 'prop-types'
import styles from './project-summary.scss'
import interestingProjectStyles from './interesting-project.scss'
import classNames from 'classnames'

export function ProjectSummary({additionalProjectsCount}) {
  const classes = classNames(interestingProjectStyles.interestingProject, styles.summary)
  return (
    <div className={classes}>
      <div className={interestingProjectStyles.inner}>+{additionalProjectsCount} additional projects</div>
    </div>
  )
}

ProjectSummary.propTypes = {
  additionalProjectsCount: PropTypes.number.isRequired
}
