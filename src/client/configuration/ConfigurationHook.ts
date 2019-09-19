import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {setConfiguration} from '../NevergreenActionCreators'
import {init, load} from './LocalRepository'
import {Configuration, toConfiguration} from './Configuration'
import {isEmpty, join} from 'lodash'

export function useConfiguration(): boolean {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await init()
      const data = await load()
      const [errors, configuration] = toConfiguration(data)

      if (isEmpty(errors)) {
        dispatch(setConfiguration(configuration as Configuration))
        setLoading(false)
      } else {
        throw new Error(`Unable to load configuration because it is invalid: ${join(errors, ', ')}`)
      }
    }

    loadData()
  }, [dispatch])

  return loading
}
