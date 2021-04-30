import React, {FormEvent, ReactElement, ReactNode, useEffect, useState} from 'react'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import noop from 'lodash/noop'
import {PrimaryButton, SecondaryButton} from './Button'
import styles from './form.scss'
import {FormErrors} from './Validation'
import {ErrorMessages} from '../Messages'
import {errorMessage} from '../Utils'
import {iCheckmark, iCross} from '../fonts/Icons'
import {useHistory} from 'react-router-dom'

interface FormProps<Fields extends string> {
  readonly children: (submitting: boolean, validationErrors: Readonly<FormErrors<Fields>>) => ReactNode;
  readonly onValidate?: () => Readonly<FormErrors<Fields>> | undefined | void;
  readonly onSuccess: () => Promise<string | undefined | void> | string | undefined | void;
  readonly onCancel?: () => void;
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

  return (
    <form onSubmit={handleSubmit}
          className={cn(styles.form, className)}
          noValidate>

      {children(submitting, validationErrors)}

      <ErrorMessages messages={submissionError}/>

      <PrimaryButton className={styles.submitButton}
                     icon={iCheckmark}
                     type="submit"
                     disabled={submitting}>
        {submitButtonText}
      </PrimaryButton>
      {!isNil(onCancel) && (
        <SecondaryButton onClick={onCancel}
                         icon={iCross}
                         disabled={submitting}>
          Cancel
        </SecondaryButton>
      )}
    </form>
  )
}
