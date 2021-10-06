import React, {FormEvent, ReactElement, ReactNode, useEffect, useState} from 'react'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import noop from 'lodash/noop'
import {PrimaryButton, SecondaryButton} from './Button'
import styles from './form.scss'
import {FormErrors} from './Validation'
import {ErrorMessages} from '../Messages'
import {errorMessage} from '../Utils'
import {useHistory} from 'react-router-dom'
import {LinkButton} from '../LinkButton'
import {Checkmark} from '../icons/Checkmark'
import {Cross} from '../icons/Cross'

interface FormProps<Fields extends string> {
  readonly children: (submitting: boolean, validationErrors: Readonly<FormErrors<Fields>>, clearErrors: () => void) => ReactNode;
  readonly onValidate?: () => Readonly<FormErrors<Fields>> | undefined | void;
  readonly onSuccess: () => Promise<string | undefined | void> | string | undefined | void;
  readonly onCancel?: string | (() => void);
  readonly className?: string;
  readonly submitButtonText?: string;
  readonly clearErrors?: boolean;
}

export function Form<Fields extends string>({
                                              className,
                                              children,
                                              onValidate = noop,
                                              onSuccess,
                                              onCancel,
                                              submitButtonText = 'Save',
                                              clearErrors = false
                                            }: FormProps<Fields>): ReactElement {

  const history = useHistory()
  const [submitting, setSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Readonly<FormErrors<Fields>>>([])
  const [submissionError, setSubmissionError] = useState('')

  useEffect(() => {
    if (clearErrors) {
      setValidationErrors([])
      setSubmissionError('')
    }
  }, [clearErrors])

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault()

    setSubmissionError('')
    setSubmitting(true)

    const errors = onValidate()

    if (errors && !isEmpty(errors)) {
      setValidationErrors(errors)
      setSubmitting(false)
    } else {
      setValidationErrors([])
      try {
        const navigateTo = await onSuccess()
        if (navigateTo) {
          history.push(navigateTo)
        } else {
          setSubmitting(false)
        }
      } catch (e) {
        setSubmitting(false)
        setSubmissionError(errorMessage(e))
      }
    }
  }

  const doClearErrors = () => {
    setValidationErrors([])
    setSubmissionError('')
  }

  return (
    <form onSubmit={handleSubmit}
          className={cn(styles.form, className)}
          noValidate>

      {children(submitting, validationErrors, doClearErrors)}

      <ErrorMessages messages={submissionError}/>

      <PrimaryButton className={styles.submitButton}
                     icon={<Checkmark/>}
                     type='submit'
                     disabled={submitting}>
        {submitButtonText}
      </PrimaryButton>
      {isFunction(onCancel) && (
        <SecondaryButton onClick={onCancel}
                         icon={<Cross/>}
                         disabled={submitting}>
          Cancel
        </SecondaryButton>
      )}
      {isString(onCancel) && !submitting && (
        <LinkButton to={onCancel}
                    icon={<Cross/>}>
          Cancel
        </LinkButton>
      )}
    </form>
  )
}
