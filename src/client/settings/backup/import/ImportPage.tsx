import type { ReactElement } from 'react'
import { useMemo } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import { useAppSelector } from '../../../configuration/Hooks'
import {
  Configuration,
  toExportableConfigurationJson,
} from '../../../configuration/Configuration'
import { fromJson } from '../../../common/Json'

export function ImportPage(): ReactElement {
  const preImportConfiguration = useAppSelector(toExportableConfigurationJson)
  const preImportConfigurationMemo = useMemo(
    () => fromJson(preImportConfiguration),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return <Outlet context={preImportConfigurationMemo} />
}

export function usePreImportConfigurationContext(): Configuration {
  return useOutletContext()
}
