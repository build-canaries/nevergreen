import { useEffect, useState } from 'react'
import { init, load } from './LocalRepository'
import { DataSource, toConfiguration } from './Configuration'
import { configurationImported } from '../settings/backup/BackupActionCreators'
import { isRight } from 'fp-ts/Either'
import * as logger from '../common/Logger'
import join from 'lodash/join'
import { useAppDispatch } from './Hooks'

interface Result {
  readonly loaded: boolean
  readonly error: boolean
}

export function useLocalConfiguration(): Result {
  const dispatch = useAppDispatch()
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoaded(false)

    const loadData = async () => {
      try {
        await init()
        const untrustedData = await load()
        const result = toConfiguration(untrustedData, DataSource.browserStorage)

        if (isRight(result)) {
          dispatch(configurationImported(result.right))
        } else {
          logger.error(
            `Unable to initalise Nevergreen because of configuration validation errors, ${join(
              result.left,
              ', '
            )}`
          )
          setError(true)
        }
      } catch (e) {
        logger.error(
          'Unable to initalise Nevergreen because of configuration loading error',
          e
        )
        setError(true)
      }

      setLoaded(true)
    }

    void loadData()
  }, [dispatch])

  return { loaded, error }
}
