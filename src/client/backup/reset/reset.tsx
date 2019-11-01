import React from 'react'
import styles from './reset.scss'
import {PrimaryButton} from '../../common/forms/Button'
import {iBin} from '../../common/fonts/Icons'
import {Messages, MessagesType} from '../../common/Messages'
export function Reset() {
    const messageType = MessagesType.ERROR
    const messages = [ 'Reset your Nevergreen configuration back to defaults. Please note, resetting your configuration can not be undone!' ]
    const resetConfiguration = () => {
        window.localStorage.clear()
        window.location.reload()
    }
    return(
        <div>
        <Messages type={messageType}
                messages={messages}
                data-locator='messages'/>
        <PrimaryButton className={styles.import}
                     onClick={resetConfiguration}
                     icon={iBin}
                     data-locator='reset'>
        Reset Configuration
      </PrimaryButton>
      </div>
    )
}