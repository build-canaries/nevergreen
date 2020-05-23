import React, {ReactElement} from 'react'
import classNames from 'classnames'
import {Checkbox} from '../../common/forms/Checkbox'
import styles from './available-project.scss'

interface AvailableProjectProps {
  readonly description: string;
  readonly isNew?: boolean;
  readonly removed?: boolean;
  readonly selected?: boolean;
  readonly selectProject: (select: boolean) => void;
}

export function AvailableProject({removed, isNew, description, selected, selectProject}: AvailableProjectProps): ReactElement {
  const listClasses = classNames(styles.availableProject, {
    [styles.removedProject]: removed
  })

  let info = null

  if (isNew) {
    info = <span className={styles.infoNew} data-locator='new'>new</span>
  } else if (removed) {
    info = <span className={styles.infoRemoved} data-locator='removed'>removed</span>
  }

  return (
    <li className={listClasses}>
      <Checkbox checked={selected}
                onToggle={selectProject}
                disabled={removed}>
        {info}
        <span className={styles.name} data-locator='name'>{description}</span>
      </Checkbox>
    </li>
  )
}
