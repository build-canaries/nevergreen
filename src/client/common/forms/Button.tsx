import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactElement,
  ReactNode,
} from 'react'
import cn from 'classnames'
import { VisuallyHidden } from '../VisuallyHidden'
import styles from './button.scss'

enum ButtonTheme {
  primary = 'primary',
  secondary = 'secondary',
  danger = 'danger',
}

type ButtonProps = {
  readonly children: ReactNode
  readonly className?: string
  readonly icon?: ReactElement
  readonly iconOnly?: boolean
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

interface BaseButtonProps extends ButtonProps {
  readonly theme: ButtonTheme
}

function BaseButton({
  theme,
  className,
  icon,
  iconOnly,
  children,
  ...additionalProps
}: BaseButtonProps): ReactElement {
  const classes = cn(styles[theme], className, {
    [styles.iconOnly]: icon && iconOnly,
  })

  return (
    <button className={classes} type="button" {...additionalProps}>
      {icon}
      {iconOnly && <VisuallyHidden>{children}</VisuallyHidden>}
      {!iconOnly && children}
    </button>
  )
}

export function PrimaryButton(props: ButtonProps): ReactElement {
  return <BaseButton theme={ButtonTheme.primary} {...props} />
}

export function SecondaryButton(props: ButtonProps): ReactElement {
  return <BaseButton theme={ButtonTheme.secondary} {...props} />
}

export function DangerButton(props: ButtonProps): ReactElement {
  return <BaseButton theme={ButtonTheme.danger} {...props} />
}

export function InputButton(props: ButtonProps): ReactElement {
  return <SecondaryButton iconOnly className={styles.inputButton} {...props} />
}
