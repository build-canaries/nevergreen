import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {registerServiceWorker} from './ServiceWorker'
import {notify} from './notification/NotificationActionCreators'

export function useServiceWorker(): void {
  const dispatch = useDispatch()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker((message) => dispatch(notify(message)))
    }
  }, [dispatch])
}
