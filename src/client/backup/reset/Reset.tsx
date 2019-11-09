import React, {useState} from 'react'
import styles from './reset.scss'
import {Container} from '../../common/Container'
import {clear} from '../../configuration/LocalRepository'
import {PrimaryButton} from '../../common/forms/Button'
import {iBin} from '../../common/fonts/Icons'

export function Reset() {
  const [resetting, setResetting] = useState(false)

  const resetConfiguration = async () => {
    setResetting(true)
    await clear()
    window.location.reload()
  }

  return (
    <Container title='Reset configuration' className={styles.container}>
      <p className={styles.warning}>
        Reset your Nevergreen configuration back to defaults. <strong>Please note, resetting your configuration can not
        be undone!</strong>
      </p>
      <PrimaryButton className={styles.reset}
                     id='reset-configuration'
                     onClick={resetConfiguration}
                     disabled={resetting}
                     icon={iBin}>
        reset configuration
      </PrimaryButton>
    </Container>
  )
}
