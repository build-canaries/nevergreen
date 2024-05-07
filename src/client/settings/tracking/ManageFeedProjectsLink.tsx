import type { ReactElement } from 'react'
import { CheckboxChecked } from '../../common/icons/CheckboxChecked'
import { VisuallyHidden } from '../../common/VisuallyHidden'
import { LinkButton } from '../../common/LinkButton'

export function ManageFeedProjectsLink({
  feedId,
  title,
}: {
  feedId: string
  title?: string
}): ReactElement {
  return (
    <LinkButton
      icon={<CheckboxChecked />}
      to={`/settings/tracking/${feedId}/projects`}
    >
      Manage projects{title && <VisuallyHidden> for {title}</VisuallyHidden>}
    </LinkButton>
  )
}
