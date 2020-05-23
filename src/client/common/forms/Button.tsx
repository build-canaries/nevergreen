import React, {ButtonHTMLAttributes, DetailedHTMLProps, ReactElement, ReactNode} from 'react'
import cn from 'classnames'
import styles from './button.scss'
import iconStyles from '../fonts/icon-font.scss'
import {VisuallyHidden} from '../VisuallyHidden'

export enum ButtonTheme {
  primary = 'primary',
  secondary = 'secondary',
  danger = 'danger'
}

type ButtonProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly icon?: string;
  readonly iconOnly?: boolean;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type BaseButtonProps = {
  theme: ButtonTheme;
} & ButtonProps

export function BaseButton({theme, className, icon, iconOnly, children, ...additionalProps}: BaseButtonProps): ReactElement {
  const classes = cn(styles[theme], className, {
    [iconStyles[`icon-${icon || ''}`]]: icon,
    [styles.withIcon]: icon && !iconOnly,
    [styles.iconOnly]: icon && iconOnly
  })

  return (
    <button className={classes}
            title={iconOnly ? children as string : undefined}
            type='button'
            {...additionalProps}>
      {iconOnly && <VisuallyHidden>{children}</VisuallyHidden>}
      {!iconOnly && children}
    </button>
  )
}

export function PrimaryButton(props: ButtonProps): ReactElement {
  return <BaseButton theme={ButtonTheme.primary} {...props}/>
}

export function SecondaryButton(props: ButtonProps): ReactElement {
  return <BaseButton theme={ButtonTheme.secondary} {...props}/>
}

export function DangerButton(props: ButtonProps): ReactElement {
  return <BaseButton theme={ButtonTheme.danger} {...props}/>
}

export function InputButton(props: ButtonProps): ReactElement {
  return <SecondaryButton iconOnly className={styles.inputButton} {...props}/>
}
