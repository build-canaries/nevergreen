import React from 'react'
import PropTypes from 'prop-types'
import styles from './project-error.scss'
import interestingProjectStyles from './interesting-project.scss'
import classNames from 'classnames'

export function ProjectError({error}) {
  const classes = classNames(interestingProjectStyles.interestingProject, styles.error)
  return (
    <div className={classes}>
      <div className={interestingProjectStyles.inner}>{error}</div>
    </div>
  )
}

ProjectError.propTypes = {
  error: PropTypes.string.isRequired
}
