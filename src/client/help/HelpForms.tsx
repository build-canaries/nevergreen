import type { ReactElement, ReactNode } from 'react'
import styles from './help-forms.scss'

interface HelpFormProps {
  readonly children: ReactNode
}

interface HelpInputProps {
  readonly name: string
  readonly icon?: ReactElement
  readonly children: ReactNode
}

export function HelpForm({ children }: HelpFormProps): ReactElement {
  return <dl className={styles.helpForm}>{children}</dl>
}

export function HelpInput({
  name,
  icon,
  children,
}: HelpInputProps): ReactElement {
  return (
    <>
      <dt>
        {icon}
        {name}
      </dt>
      <dd>{children}</dd>
    </>
  )
}
