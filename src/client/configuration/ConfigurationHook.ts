import { init, load } from './LocalRepository'
import {
  DataSource,
  formatConfigurationErrorMessages,
  toConfiguration,
} from './Configuration'
import { configurationImported } from '../settings/backup/BackupActionCreators'
import { useAppDispatch } from './Hooks'
import { useQuery } from '@tanstack/react-query'
import { info } from '../common/Logger'
import { useEffect } from 'react'

interface Result {
  readonly isLoading: boolean
  readonly isError: boolean
  readonly error: unknown
}

export function useLocalConfiguration(): Result {
  const dispatch = useAppDispatch()

  const { isError, isLoading, error, data } = useQuery(
    ['load-config'],
    async () => {
      info('Loading local configuration')

      await init()
      const untrustedData = await load()

      try {
        const configuration = toConfiguration(
          untrustedData,
          DataSource.systemImport,
        )
        return configurationImported(configuration)
      } catch (err) {
        throw new Error(
          `Unable to initialise Nevergreen because of configuration validation errors, ${formatConfigurationErrorMessages(
            err,
          ).join(', ')}`,
        )
      }
    },
  )

  useEffect(() => {
    if (data) {
      dispatch(data)
    }
  }, [data, dispatch])

  return { isLoading, isError, error }
}
