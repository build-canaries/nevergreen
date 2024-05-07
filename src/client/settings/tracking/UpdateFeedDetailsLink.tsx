import type { ReactElement } from 'react'
import { VisuallyHidden } from '../../common/VisuallyHidden'
import { Cog } from '../../common/icons/Cog'
import { LinkButton } from '../../common/LinkButton'

export function UpdateFeedDetailsLink({
  feedId,
  title,
}: {
  feedId: string
  title?: string
}): ReactElement {
  return (
    <LinkButton icon={<Cog />} to={`/settings/tracking/${feedId}/details`}>
      Update details{title && <VisuallyHidden> for {title}</VisuallyHidden>}
    </LinkButton>
  )
}
