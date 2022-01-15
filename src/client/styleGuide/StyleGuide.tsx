import React, {ReactElement, useEffect} from 'react'
import {Typography} from './Typography'
import {Forms} from './Forms'
import {Layout} from './Layout'
import {Icons} from './Icons'
import {Page} from '../common/Page'

interface StyleGuideProps {
  readonly setNotification: (notification: string) => void;
}

export function StyleGuide({setNotification}: StyleGuideProps): ReactElement {
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
