import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../common/forms/Input'
import {WithHelp} from '../common/ContextualHelp'
import {SuccessHelp} from './SuccessHelp'
import styles from './add-message.scss'
import {PrimaryButton} from '../common/forms/Button'
import {iPlus} from '../common/fonts/Icons'

export function AddMessage({addMessage}) {
  const [message, setMessage] = useState('')
  const triggerAddMessage = () => {
    addMessage(message)
    setMessage('')
  }

  return (
    <div className={styles.addMessage}>
      <Input className={styles.addMessageInput}
             placeholder='text or image URL'
             value={message}
             onChange={({target}) => setMessage(target.value)}
             onEnter={triggerAddMessage}
             data-locator='message'>
        message
      </Input>
      <WithHelp title='Success'
                help={<SuccessHelp/>}
                className={styles.help}>
        <PrimaryButton className={styles.add}
                       onClick={triggerAddMessage}
                       data-locator='add-message'
                       icon={iPlus}>
          <span aria-label='add success message'>add</span>
        </PrimaryButton>
      </WithHelp>
    </div>
  )
}

AddMessage.propTypes = {
  addMessage: PropTypes.func.isRequired
}
