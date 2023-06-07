import type { ReactElement } from 'react'
import { LinkButton } from '../../common/LinkButton'
import { RoutePaths } from '../../AppRoutes'
import { VisuallyHidden } from '../../common/VisuallyHidden'
import { PaintFormat } from '../../common/icons/PaintFormat'
import styles from './change-colours-link.scss'

interface ChangeColoursLinkProps {
  readonly path: string
  readonly additionalContext?: string
}

export function ChangeColoursLink({
  path,
  additionalContext,
}: ChangeColoursLinkProps): ReactElement {
  return (
    <LinkButton
      to={RoutePaths.colours.replace(':for', path)}
      className={styles.link}
      icon={<PaintFormat />}
    >
      Change colours
      {additionalContext && (
        <VisuallyHidden> {additionalContext}</VisuallyHidden>
      )}
    </LinkButton>
  )
}
