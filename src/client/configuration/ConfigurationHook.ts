import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {init, load} from './LocalRepository'
import {toConfiguration} from './Configuration'
import {join} from 'lodash'
import {configurationImported} from '../backup/BackupActionCreators'
import {isRight} from 'fp-ts/lib/Either'

export function useLocalConfiguration(): boolean {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)

    const loadData = async () => {
      await init()
      const rawData = await load()
      const result = toConfiguration(rawData)

      if (isRight(result)) {
        dispatch(configurationImported(result.right))
      } else {
        throw new Error(`Unable to initalise Nevergreen because of configuration loadings errors, ${join(result.left, ', ')}`)
      }

      setLoaded(true)
    }

    void loadData()
  }, [dispatch])

  return loaded
}
