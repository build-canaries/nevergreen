import React, {FormEvent, ReactElement, ReactNode, useEffect, useState} from 'react'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import noop from 'lodash/noop'
import {PrimaryButton, SecondaryButton} from './Button'
import styles from './form.scss'
import {FormErrors} from './Validation'
import {ErrorMessages, SuccessMessages} from '../Messages'
import {errorMessage} from '../Utils'
import {useNavigate} from 'react-router-dom'
import {LinkButton} from '../LinkButton'
import {Checkmark} from '../icons/Checkmark'
import {Cross} from '../icons/Cross'
import {useQuery} from 'react-query'
import {Loop} from '../icons/Loop'

type OnSuccess = {
  readonly navigateTo: string;
  readonly successMessage?: undefined;
} | {
  readonly navigateTo?: undefined;
  readonly successMessage: string;
}

interface FormProps<Fields extends string> {
  readonly children: (submitting: boolean, validationErrors: Readonly<FormErrors<Fields>>, clearErrors: () => void) => ReactNode;
  readonly onValidate?: () => Readonly<FormErrors<Fields>> | undefined | void;
  readonly onSuccess: (signal: AbortSignal | undefined) => Promise<OnSuccess | undefined | void> | OnSuccess | undefined | void;
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

  const navigate = useNavigate()
  const [validationErrors, setValidationErrors] = useState<Readonly<FormErrors<Fields>>>([])

  const {refetch, isFetching, isError, isSuccess, data, error} = useQuery('form', async ({signal}) => {
    return onSuccess(signal)
  }, {
    enabled: false,
    onSuccess: (res) => {
      if (res?.navigateTo) {
        navigate(res.navigateTo)
      }
    }
  })

  useEffect(() => {
    if (clearErrors) {
      setValidationErrors([])
    }
  }, [clearErrors])

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()

    const validationErrors = onValidate()

    if (validationErrors && !isEmpty(validationErrors)) {
      setValidationErrors(validationErrors)
    } else {
      setValidationErrors([])
      void refetch()
    }
  }

  const doClearErrors = () => {
    setValidationErrors([])
  }

  const showSubmissionErrors = isEmpty(validationErrors) && !isFetching && isError
  const showSubmissionSuccess = isEmpty(validationErrors) && !isFetching && isSuccess && data?.successMessage

  return (
    <form onSubmit={handleSubmit}
          className={cn(styles.form, className)}
          noValidate>

      {children(isFetching, validationErrors, doClearErrors)}

      {showSubmissionErrors && <ErrorMessages messages={errorMessage(error)}/>}
      {showSubmissionSuccess && <SuccessMessages messages={data.successMessage}/>}

      <PrimaryButton className={styles.submitButton}
                     icon={isFetching ? <Loop loaded={false}/> : <Checkmark/>}
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
