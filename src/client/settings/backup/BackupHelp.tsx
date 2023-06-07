import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { RoutePaths } from '../../AppRoutes'
import { Plus } from '../../common/icons/Plus'
import { Cog } from '../../common/icons/Cog'
import { CloudUpload } from '../../common/icons/CloudUpload'
import { CloudDownload } from '../../common/icons/CloudDownload'
import { Bin } from '../../common/icons/Bin'
import { FloppyDisk } from '../../common/icons/FloppyDisk'
import { FolderOpen } from '../../common/icons/FolderOpen'

const keywords = ['backup', 'export', 'import', 'add remote location']

export function BackupHelp({ searchQuery }: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Backup"
      page={RoutePaths.backup}
    >
      <HelpForm>
        <HelpInput name="Export locally" icon={<FloppyDisk />}>
          This will take you to the export page where a manual export can be
          triggered to the clipboard or a local file.
        </HelpInput>
        <HelpInput name="Import locally" icon={<FolderOpen />}>
          This will take you to the import page where a manual import can be
          triggered from a local file.
        </HelpInput>
      </HelpForm>
      <HelpForm>
        <HelpInput name="Add remote location" icon={<Plus />}>
          Adds a new remote backup location. You can import and export to
          multiple remote backup locations.
        </HelpInput>
      </HelpForm>
      <p>
        Added remote locations will appear and can be managed from this page.
      </p>
      <HelpForm>
        <HelpInput name="Export" icon={<CloudUpload />}>
          This will take you to the export page where a manual export can be
          triggered to the given remote location.
        </HelpInput>
        <HelpInput name="Import" icon={<CloudDownload />}>
          This will take you to the import page where a manual import can be
          triggered from the given remote location.
        </HelpInput>
        <HelpInput name="Details" icon={<Cog />}>
          This will take you to the details page for the remote location.
        </HelpInput>
        <HelpInput name="Remove" icon={<Bin />}>
          This will permanently delete the remote location. Remote locations can
          be re-added at any time.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
