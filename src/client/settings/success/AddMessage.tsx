import React, {ReactElement, useState} from 'react'
import {Input} from '../../common/forms/Input'
import styles from './add-message.scss'
import {addMessage} from './SuccessActionCreators'
import {useDispatch, useSelector} from 'react-redux'
import {getSuccessMessages} from './SuccessReducer'
import {isBlank} from '../../common/Utils'
import {Form} from '../../common/forms/Form'
import {firstError, FormErrors} from '../../common/forms/Validation'
import {useHistory} from 'react-router-dom'
import {ROUTE_SETTINGS} from '../../Routes'
import {Title} from '../../common/Title'

type Fields = 'message'

export function AddMessage(): ReactElement {
  const dispatch = useDispatch()
  const history = useHistory()
  const messages = useSelector(getSuccessMessages)
  const [message, setMessage] = useState('')

  const onValidate = (): FormErrors<Fields> => {
    if (isBlank(message)) {
      return [{field: 'message', message: 'Please enter a success message or image URL'}]
    } else if (messages.find((msg) => msg === message)) {
      return [{field: 'message', message: 'Success message has already been added, please try another'}]
    }
    return []
  }

  const onSuccess = () => {
    dispatch(addMessage(message))
    history.push(`${ROUTE_SETTINGS}#success`)
  }

  return (
    <div className={styles.page}>
      <Title show>Add success message</Title>

      <Form onValidate={onValidate}
            onSuccess={onSuccess}
            submitButtonText='Add message'>
        {(submitting, validationErrors, clearValidationErrors) => {
          return (
            <Input className={styles.addMessageInput}
                   placeholder='text or image URL'
                   value={message}
                   onChange={({target}) => {
                     setMessage(target.value)
                     clearValidationErrors('message')
                   }}
                   error={firstError<Fields>('message', validationErrors)}
                   disabled={submitting}
                   data-locator='message'>
              Message
            </Input>
          )
        }}
      </Form>
    </div>
  )
}
