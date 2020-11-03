import React, {ReactElement, useState} from 'react'
import styles from './reset.scss'
import {Container} from '../../common/Container'
import {clear} from '../../configuration/LocalRepository'
import {DangerButton} from '../../common/forms/Button'
import {iBin} from '../../common/fonts/Icons'

export function Reset(): ReactElement {
  const [resetting, setResetting] = useState(false)

  const resetConfiguration = async () => {
    setResetting(true)
    await clear()
    window.location.reload()
  }

  return (
    <Container title='Reset configuration' initiallyHidden className={styles.container}>
      <p className={styles.warning}>
        Reset your Nevergreen configuration back to defaults. <strong>Please note, resetting your configuration can not
        be undone!</strong>
      </p>
      <DangerButton className={styles.reset}
                    onClick={resetConfiguration}
                    disabled={resetting}
                    icon={iBin}>
        Reset configuration
      </DangerButton>
    </Container>
  )
}
