import React, {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from 'react'
import cn from 'classnames'
import styles from './button.scss'
import iconStyles from '../fonts/icon-font.scss'
import {VisuallyHidden} from '../VisuallyHidden'

type ButtonProps = {
  children: ReactNode;
  className?: string;
  icon?: string;
  iconOnly?: boolean;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type BaseButtonProps = {
  theme: 'primary' | 'secondary' | 'danger';
} & ButtonProps

export function BaseButton({theme, className, icon, iconOnly, children, ...additionalProps}: BaseButtonProps) {
  const classes = cn(styles[theme], className, {
    [iconStyles[`icon-${icon}`]]: icon,
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

export function PrimaryButton(props: ButtonProps) {
  return <BaseButton theme='primary' {...props}/>
}

export function SecondaryButton(props: ButtonProps) {
  return <BaseButton theme='secondary' {...props}/>
}

export function DangerButton(props: ButtonProps) {
  return <BaseButton theme='danger' {...props}/>
}

export function InputButton(props: ButtonProps) {
  return <SecondaryButton iconOnly className={styles.inputButton} {...props}/>
}
