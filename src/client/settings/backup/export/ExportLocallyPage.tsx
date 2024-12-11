import type { ReactElement } from 'react'
import { useCallback, useState } from 'react'
import { SecondaryButton } from '../../../common/forms/Button'
import { useClipboard } from './ClipboardHook'
import { toExportableConfigurationJson } from '../../../configuration/Configuration'
import { TextArea } from '../TextArea'
import { errorMessage } from '../../../common/Utils'
import { saveFile } from '../FileSystem'
import { Page } from '../../../common/Page'
import { LinkButton } from '../../../common/LinkButton'
import { FloppyDisk } from '../../../common/icons/FloppyDisk'
import { Paste } from '../../../common/icons/Paste'
import { Cross } from '../../../common/icons/Cross'
import {
  TimedErrorMessages,
  TimedSuccessMessages,
} from '../../../common/TimedMessages'
import { useAppSelector } from '../../../configuration/Hooks'
import { RoutePaths } from '../../../AppRoutes'
import styles from './export-locally-page.scss'

export function ExportLocallyPage(): ReactElement {
  const configuration = useAppSelector(toExportableConfigurationJson)

  const [saveFailure, setSaveFailure] = useState<ReadonlyArray<string>>([])
  const [copyingSuccess, setCopyingSuccess] = useState<string>('')
  const [copyingFailure, setCopyingFailure] = useState<string>('')

  const copySuccess = useCallback(() => {
    setCopyingSuccess('Copied current configuration to clipboard')
  }, [])
  const copyError = useCallback(() => {
    setCopyingFailure('Unable to copy, please manually copy')
  }, [])

  const autoCopySupported = useClipboard(
    '#copy-to-clipboard',
    copySuccess,
    copyError,
  )

  const saveLocally = () => {
    try {
      saveFile(configuration)
    } catch (e) {
      setSaveFailure([
        'Unable to save because of an error, try again or copy and save manually',
        errorMessage(e),
      ])
    }
  }

  const dismissSaveFailure = useCallback(() => {
    setSaveFailure([])
  }, [])
  const dismissCopyingSuccess = useCallback(() => {
    setCopyingSuccess('')
  }, [])
  const dismissCopyingFailure = useCallback(() => {
    setCopyingFailure('')
  }, [])

  return (
    <Page title="Export locally" icon={<FloppyDisk />}>
      <TimedErrorMessages
        onDismiss={dismissSaveFailure}
        messages={saveFailure}
      />

      <SecondaryButton
        className={styles.saveFile}
        icon={<FloppyDisk />}
        onClick={saveLocally}
      >
        Save locally...
      </SecondaryButton>

      {autoCopySupported && (
        <>
          <TimedSuccessMessages
            onDismiss={dismissCopyingSuccess}
            messages={copyingSuccess}
          />
          <TimedErrorMessages
            onDismiss={dismissCopyingFailure}
            messages={copyingFailure}
          />
          <SecondaryButton
            className={styles.copy}
            id="copy-to-clipboard"
            data-clipboard-target="#export-data"
            icon={<Paste />}
          >
            Copy to clipboard
          </SecondaryButton>
        </>
      )}

      <TextArea
        className={styles.exportInput}
        label="Current configuration"
        value={configuration}
        readOnly
        id="export-data"
      />
      <LinkButton
        to={RoutePaths.backup}
        icon={<Cross />}
        className={styles.cancel}
      >
        Cancel
      </LinkButton>
    </Page>
  )
}

export const Component = ExportLocallyPage
