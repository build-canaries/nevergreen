import React, {ReactElement} from 'react'
import {DangerButton} from '../forms/Button'
import styles from './card-heading.scss'
import {Bin} from '../icons/Bin'

interface CardHeadingProps {
  readonly icon?: ReactElement;
  readonly title: ReactElement | string;
  readonly onRemove?: () => void;
}

export function CardHeading({icon, title, onRemove}: CardHeadingProps): ReactElement {
  return (
    <>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h2 className={styles.title}>{title}</h2>
      {onRemove && (
        <DangerButton onClick={onRemove}
                      icon={<Bin/>}
                      iconOnly>
          Remove {title}
        </DangerButton>
      )}
    </>
  )
}
