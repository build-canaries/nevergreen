import React from 'react'
import styles from './reset.scss'
import { Container } from '../../common/Container'
import {clear} from '../../configuration/LocalRepository'
import {PrimaryButton} from '../../common/forms/Button'
import {iBin} from '../../common/fonts/Icons'

export function Reset() {
    
    const resetConfiguration = () => {
        clear()
        window.location.reload()
    }
    return(
        <>
        <Container title={'Reset Configuration'}>
        <span className={styles.label}>Reset your Nevergreen configuration back to defaults. Please note, resetting your configuration can not be undone!</span>
        <PrimaryButton className={styles.reset}
                    id='reset-configuration'
                     onClick={resetConfiguration}
                     icon={iBin}
                     data-locator='reset'>
        reset configuration
      </PrimaryButton>
      </Container>
    </>
    )
}