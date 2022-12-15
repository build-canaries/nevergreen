import { init, load } from './LocalRepository'
import { DataSource, toConfiguration } from './Configuration'
import { configurationImported } from '../settings/backup/BackupActionCreators'
import { isRight } from 'fp-ts/Either'
import { useAppDispatch } from './Hooks'
import { useQuery } from '@tanstack/react-query'
import { info } from '../common/Logger'

interface Result {
  readonly isLoading: boolean
  readonly isError: boolean
}

export function useLocalConfiguration(): Result {
  const dispatch = useAppDispatch()

  const { isError, isLoading } = useQuery(['load-config'], async () => {
    info('Loading local configuration')

    await init()
    const untrustedData = await load()
    const result = toConfiguration(untrustedData, DataSource.systemImport)

    if (isRight(result)) {
      dispatch(configurationImported(result.right))
      return true
    } else {
      throw new Error(
        `Unable to initialise Nevergreen because of configuration validation errors, ${result.left.join(
          ','
        )}`
      )
    }
  })

  return { isLoading, isError }
}
