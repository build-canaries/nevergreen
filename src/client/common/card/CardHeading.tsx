import React, {ReactElement} from 'react'
import {DangerButton} from '../forms/Button'
import {iBin} from '../fonts/Icons'
import styles from './card-heading.scss'

interface CardHeadingProps {
  readonly icon?: ReactElement;
  readonly title: string;
  readonly onRemove?: () => void;
}

export function CardHeading({icon, title, onRemove}: CardHeadingProps): ReactElement {
  return (
    <>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h2 className={styles.title}>{title}</h2>
      {onRemove && (
        <DangerButton onClick={onRemove}
                      icon={iBin}
                      iconOnly>
          Remove {title}
        </DangerButton>
      )}
    </>
  )
}
