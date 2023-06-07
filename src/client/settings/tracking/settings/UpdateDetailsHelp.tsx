import type { ReactElement } from 'react'
import type { HelpProps } from '../../../help/HelpArticle'
import { HelpArticle } from '../../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../../help/HelpForms'
import { RoutePaths } from '../../../AppRoutes'
import { Dice } from '../../../common/icons/Dice'
import { Cog } from '../../../common/icons/Cog'

const keywords = [
  'tracking',
  'settings',
  'update connection',
  'name',
  'server type',
]

export function UpdateDetailsHelp({ searchQuery }: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Update details"
      page={RoutePaths.trackingDetails}
    >
      <HelpForm>
        <HelpInput name="Update connection" icon={<Cog />}>
          Allows updating of the connection URL and/or authentication.
        </HelpInput>
        <HelpInput name="Name">
          A friendly name of the CCTray XML feed used in various places instead
          of the URL. A random name is generated when a feed is added, this can
          be removed if a name is not desired.
        </HelpInput>
        <HelpInput name="Randomise name" icon={<Dice />}>
          Generates and sets a new random name.
        </HelpInput>
        <HelpInput name="Server type">
          The server type can be set to enable some server specific parsing.
          Only servers that require specific parsing are in the list. If your
          server is not specified and is displaying incorrect it may require
          some specific parsing. Please submit an issue telling us the server
          you are using and ideally an anonymised copy of the CCTray XML feed it
          produced.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
