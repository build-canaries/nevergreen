import React, {FormEvent, ReactElement, useState} from 'react'
import {Input} from '../common/forms/Input'
import styles from './add-message.scss'
import {PrimaryButton} from '../common/forms/Button'
import {iPlus} from '../common/fonts/Icons'
import {addMessage} from './SuccessActionCreators'
import {useDispatch, useSelector} from 'react-redux'
import {getSuccessMessages} from './SuccessReducer'
import {WarningMessages} from '../common/Messages'
import {isBlank, notEmpty} from '../common/Utils'

export const NO_MESSAGES_WARNING = 'No success messages added, a blank screen will be shown on the Monitor page when no interesting projects are displayed'

export function AddMessage(): ReactElement {
  const dispatch = useDispatch()
  const messages = useSelector(getSuccessMessages)
  const [message, setMessage] = useState('')
  const [validationError, setValidationError] = useState('')

  const noMessagesWarning = notEmpty(messages)
    ? ''
    : NO_MESSAGES_WARNING

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()

    setValidationError('')

    if (isBlank(message)) {
      setValidationError('Please enter a success message or image URL')
    } else if (messages.find((msg) => msg === message)) {
      setValidationError('Success message has already been added, please try another')
    } else {
      dispatch(addMessage(message))
      setMessage('')
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}
            className={styles.form}>
        <Input className={styles.addMessageInput}
               placeholder='text or image URL'
               value={message}
               onChange={({target}) => {
                 setMessage(target.value)
                 setValidationError('')
               }}
               error={validationError}
               data-locator='message'>
          Message
        </Input>
        <PrimaryButton className={styles.add}
                       type='submit'
                       data-locator='add-message'
                       icon={iPlus}>
          Add message
        </PrimaryButton>
      </form>
      <WarningMessages messages={noMessagesWarning}/>
    </div>
  )
}
