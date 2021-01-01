import React, {DetailedHTMLProps, InputHTMLAttributes, ReactElement} from 'react'
import cn from 'classnames'
import {ErrorMessages} from '../../common/Messages'
import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import styles from './text-area.scss'

type TextAreaProps = {
  readonly label: string;
  readonly error?: ReadonlyArray<string> | string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export function TextArea({label, error = '', id, ...props}: TextAreaProps): ReactElement {
  const hasError = !isEmpty(error)
  const actualId = id ?? uniqueId('i')
  const errorId = hasError ? uniqueId('e') : undefined

  const textAreaClasses = cn(styles.data, {
    [styles.error]: hasError
  })

  return (
    <>
      <label className={styles.label} htmlFor={actualId}>
        {label}
      </label>
      <textarea className={textAreaClasses}
                id={actualId}
                spellCheck={false}
                autoComplete='off'
                aria-describedby={errorId}
                {...props}/>
      <ErrorMessages id={errorId}
                     className={styles.errorMessages}
                     messages={error}/>
    </>
  )
}
