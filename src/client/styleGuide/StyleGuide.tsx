import React, {ReactElement, useEffect} from 'react'
import {Typography} from './Typography'
import {Forms} from './Forms'
import {Layout} from './Layout'
import {Icons} from './Icons'
import {Page} from '../common/Page'
import {useNevergreenContext} from '../Nevergreen'

export function StyleGuide(): ReactElement {
  const {setNotification} = useNevergreenContext()
  useEffect(() => {
    setNotification('Sweet roll cookie chocolate cake gingerbread marshmallow jelly beans')
    return () => {
      setNotification('')
    }
  }, [setNotification])

  return (
    <Page title='Style guide'>
      <Typography/>
      <Forms/>
      <Layout/>
      <Icons/>
    </Page>
  )
}
