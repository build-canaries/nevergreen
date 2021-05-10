import React, {ReactElement, useState} from 'react'
import {Input} from '../../common/forms/Input'
import styles from './add-message.scss'
import {addMessage} from './SuccessActionCreators'
import {useDispatch, useSelector} from 'react-redux'
import {getSuccessMessages} from './SuccessReducer'
import {isBlank} from '../../common/Utils'
import {Form} from '../../common/forms/Form'
import {firstError, FormErrors} from '../../common/forms/Validation'
import {ROUTE_SETTINGS, ROUTE_SETTINGS_ANCHOR_SUCCESS} from '../../Routes'
import {Title} from '../../common/Title'
import {Link} from 'react-router-dom'

type Fields = 'message'

export function AddMessage(): ReactElement {
  const dispatch = useDispatch()
  const messages = useSelector(getSuccessMessages)
  const [message, setMessage] = useState('')

  const onValidate = (): FormErrors<Fields> => {
    if (isBlank(message)) {
      return [{field: 'message', message: 'Enter a message or image URL'}]
    } else if (messages.find((msg) => msg === message)) {
      return [{field: 'message', message: 'Message has already been added'}]
    }
    return []
  }

  const onSuccess = () => {
    dispatch(addMessage(message))
    return `${ROUTE_SETTINGS}#success`
  }

  return (
    <div className={styles.page}>
      <Title show>Add success message</Title>

      <Form onValidate={onValidate}
            onSuccess={onSuccess}
            submitButtonText='Add message'>
        {(submitting, validationErrors) => {
          return (
            <Input className={styles.addMessageInput}
                   placeholder='message or image URL'
                   value={message}
                   onChange={({target}) => {
                     setMessage(target.value)
                   }}
                   error={firstError<Fields>('message', validationErrors)}
                   disabled={submitting}
                   data-locator='message'>
              Message
            </Input>
          )
        }}
      </Form>
      <Link to={ROUTE_SETTINGS_ANCHOR_SUCCESS} className={styles.cancel}>Cancel</Link>
    </div>
  )
}
