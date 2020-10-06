import React, {ReactElement} from 'react'
import {Container} from '../../common/Container'
import {Import} from './Import'
import {Export} from './Export'
import styles from './local-backup.scss'

export function LocalBackup(): ReactElement {
  return (
    <Container title='Local backup'>
      <div className={styles.container}>
        <Import/>
        <Export/>
      </div>
    </Container>
  )
}
