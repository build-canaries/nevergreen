import React, {DetailedHTMLProps, InputHTMLAttributes, ReactElement} from 'react'
import cn from 'classnames'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import styles from './text-area.scss'
import {VisuallyHidden} from '../../common/VisuallyHidden'

type TextAreaProps = {
  readonly label: string;
  readonly errors?: ReadonlyArray<string>;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export function TextArea({label, errors = [], id, className, ...props}: TextAreaProps): ReactElement {
  const hasError = !isEmpty(errors)
  const actualId = id ?? uniqueId('i')
  const errorId = hasError ? uniqueId('e') : undefined

  const containerClasses = classNames(className, {
    [styles.containerError]: hasError
  })
  const textAreaClasses = cn(styles.data, {
    [styles.error]: hasError
  })

  return (
    <div className={containerClasses}>
      <label className={styles.label} htmlFor={actualId}>
        {label}
      </label>
      {hasError && (
        <ul id={errorId}
            className={styles.errorMessage}>
          {errors.map((error) => {
            return (
              <li key={error}>
                <VisuallyHidden>Error: </VisuallyHidden>
                {error}
              </li>
            )
          })}
        </ul>
      )}
      <textarea className={textAreaClasses}
                id={actualId}
                spellCheck={false}
                autoComplete='off'
                aria-describedby={errorId}
                {...props}/>
    </div>
  )
}
