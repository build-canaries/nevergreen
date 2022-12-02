import React, {ReactElement, useState} from 'react'
import {Input} from '../../common/forms/Input'
import styles from './add-message.scss'
import {useSelector} from 'react-redux'
import {addMessage, getSuccessMessages} from './SuccessReducer'
import {isBlank} from '../../common/Utils'
import {Form} from '../../common/forms/Form'
import {firstError, FormErrors} from '../../common/forms/Validation'
import {Page} from '../../common/Page'
import {Image} from '../../common/icons/Image'
import {ROUTE_SUCCESS} from '../../AppRoutes'
import {useAppDispatch} from '../../configuration/Hooks'

type Fields = 'message'

export function AddMessage(): ReactElement {
  const dispatch = useAppDispatch()
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
    return {navigateTo: ROUTE_SUCCESS}
  }

  return (
    <Page title="Add success message" icon={<Image/>}>
      <Form onValidate={onValidate}
            onSuccess={onSuccess}
            submitButtonText="Add message"
            onCancel={ROUTE_SUCCESS}>
        {(submitting, validationErrors) => {
          return (
            <Input className={styles.addMessageInput}
                   placeholder="message or image URL"
                   value={message}
                   onChange={({target}) => {
                     setMessage(target.value)
                   }}
                   error={firstError<Fields>('message', validationErrors)}
                   disabled={submitting}>
              Message
            </Input>
          )
        }}
      </Form>
    </Page>
  )
}
