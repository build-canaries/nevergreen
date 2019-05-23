import React from 'react'
import styles from './project-summary.scss'
import interestingProjectStyles from './interesting-project.scss'
import classNames from 'classnames'

interface ProjectSummaryProps {
  additionalProjectsCount: number;
}

export function ProjectSummary({additionalProjectsCount}: ProjectSummaryProps) {
  const classes = classNames(interestingProjectStyles.interestingProject, styles.summary)
  return (
    <div className={classes}>
      <div className={interestingProjectStyles.inner}>+{additionalProjectsCount} additional projects</div>
    </div>
  )
}
