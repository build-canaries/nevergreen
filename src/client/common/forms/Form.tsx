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
import {useQuery} from 'react-query'

interface FormProps<Fields extends string> {
  readonly children: (submitting: boolean, validationErrors: Readonly<FormErrors<Fields>>, clearErrors: () => void) => ReactNode;
  readonly onValidate?: () => Readonly<FormErrors<Fields>> | undefined | void;
  readonly onSuccess: (signal: AbortSignal | undefined) => Promise<string | undefined | void> | string | undefined | void;
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
  const [validationErrors, setValidationErrors] = useState<Readonly<FormErrors<Fields>>>([])

  const {refetch, isFetching, isError, data, error} = useQuery('form', async ({signal}) => {
    return onSuccess(signal)
  }, {
    enabled: false
  })

  useEffect(() => {
    if (clearErrors) {
      setValidationErrors([])
    }
  }, [clearErrors])

  useEffect(() => {
    if (data) {
      history.push(data)
    }
  }, [data, history])

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()

    const errors = onValidate()

    if (errors && !isEmpty(errors)) {
      setValidationErrors(errors)
    } else {
      setValidationErrors([])
      void refetch()
    }
  }

  const doClearErrors = () => {
    setValidationErrors([])
  }

  return (
    <form onSubmit={handleSubmit}
          className={cn(styles.form, className)}
          noValidate>

      {children(isFetching, validationErrors, doClearErrors)}

      {isError && <ErrorMessages messages={errorMessage(error)}/>}

      <PrimaryButton className={styles.submitButton}
                     icon={<Checkmark/>}
                     type='submit'
                     disabled={isFetching}>
        {submitButtonText}
      </PrimaryButton>
      {isFunction(onCancel) && (
        <SecondaryButton onClick={onCancel}
                         icon={<Cross/>}
                         disabled={isFetching}>
          Cancel
        </SecondaryButton>
      )}
      {isString(onCancel) && !isFetching && (
        <LinkButton to={onCancel}
                    icon={<Cross/>}>
          Cancel
        </LinkButton>
      )}
    </form>
  )
}
