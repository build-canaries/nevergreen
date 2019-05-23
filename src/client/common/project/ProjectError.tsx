import React from 'react'
import styles from './project-error.scss'
import interestingProjectStyles from './interesting-project.scss'
import cn from 'classnames'

interface ProjectErrorProps {
  error: string;
}

export function ProjectError({error}: ProjectErrorProps) {
  const classes = cn(interestingProjectStyles.interestingProject, styles.error)
  return (
    <div className={classes}>
      <div className={interestingProjectStyles.inner}>{error}</div>
    </div>
  )
}
