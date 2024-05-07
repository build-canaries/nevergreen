import type { ReactElement } from 'react'
import cn from 'classnames'
import { LinkButton } from '../../common/LinkButton'
import { RoutePaths } from '../../AppRoutes'
import { VisuallyHidden } from '../../common/VisuallyHidden'
import { PaintFormat } from '../../common/icons/PaintFormat'
import { generatePath } from 'react-router-dom'
import styles from './change-colours-link.scss'

interface ChangeColoursLinkProps {
  readonly path: string
  readonly additionalContext?: string
  readonly className?: string
}

export function ChangeColoursLink({
  path,
  additionalContext,
  className,
}: ChangeColoursLinkProps): ReactElement {
  return (
    <LinkButton
      to={generatePath(RoutePaths.colours, { for: path })}
      className={cn(styles.link, className)}
      icon={<PaintFormat />}
    >
      Change colours
      {additionalContext && (
        <VisuallyHidden> {additionalContext}</VisuallyHidden>
      )}
    </LinkButton>
  )
}
