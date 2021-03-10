import React, {FormEvent, ReactElement, ReactNode, useState} from 'react'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import {PrimaryButton, SecondaryButton} from './Button'
import styles from './form.scss'
import {FormErrors, removeErrorFromState} from './Validation'
import {ErrorMessages} from '../Messages'
import {errorMessage} from '../Utils'
import {iCheckmark, iCross} from '../fonts/Icons'

interface FormProps<Fields extends string> {
  readonly children: (submitting: boolean, validationErrors: Readonly<FormErrors<Fields>>, clearValidationErrors: (field?: Fields) => void) => ReactNode;
  readonly onValidate: () => Readonly<FormErrors<Fields>>;
  readonly onSuccess: () => Promise<void> | void;
  readonly onCancel?: () => void;
  readonly className?: string;
  readonly submitButtonText?: string;
}

export function Form<Fields extends string>({
                                              className,
                                              children,
                                              onValidate,
                                              onSuccess,
                                              onCancel,
                                              submitButtonText = 'Save'
                                            }: FormProps<Fields>): ReactElement {

  const [submitting, setSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Readonly<FormErrors<Fields>>>([])
  const [submissionError, setSubmissionError] = useState('')

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault()

    setSubmissionError('')
    setSubmitting(true)

    const errors = onValidate()

    if (!isEmpty(errors)) {
      setValidationErrors(errors)
      setSubmitting(false)
    } else {
      try {
        await onSuccess()
      } catch (e) {
        setSubmitting(false)
        setSubmissionError(errorMessage(e))
      }
    }
  }

  const clear = (field?: Fields) => {
    if (isNil(field)) {
      setValidationErrors([])
    } else {
      setValidationErrors(removeErrorFromState<Fields>(field))
    }
  }

  return (
    <form onSubmit={handleSubmit}
          className={cn(styles.form, className)}
          noValidate>

      {children(submitting, validationErrors, clear)}

      <ErrorMessages messages={submissionError}/>

      <PrimaryButton className={styles.submitButton}
                     icon={iCheckmark}
                     type='submit'
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
