import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Checkbox} from '../../common/forms/Checkbox'
import styles from './available-project.scss'
import {isBlank} from '../../common/Utils'

export function AvailableProject({removed, isNew, stage, name, selected, selectProject}) {
  const listClasses = classNames(styles.availableProject, {
    [styles.removedProject]: removed
  })

  let info = null

  if (isNew) {
    info = <span className={styles.infoNew} data-locator='new'>new</span>
  } else if (removed) {
    info = <span className={styles.infoRemoved} data-locator='removed'>removed</span>
  }

  const displayName = isBlank(stage) ? name : `${name} ${stage}`

  return (
    <li className={listClasses}>
      <Checkbox checked={selected}
                onToggle={selectProject}
                disabled={removed}>
        {info}
        <span className={styles.name} data-locator='name'>{displayName}</span>
      </Checkbox>
    </li>
  )
}

AvailableProject.propTypes = {
  name: PropTypes.string.isRequired,
  stage: PropTypes.string,
  isNew: PropTypes.bool,
  removed: PropTypes.bool,
  selected: PropTypes.bool,
  selectProject: PropTypes.func.isRequired
}
