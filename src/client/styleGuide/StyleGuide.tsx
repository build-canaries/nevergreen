import React, {ReactElement} from 'react'
import {Typography} from './Typography'
import {Forms} from './Forms'
import {Layout} from './Layout'
import {Icons} from './Icons'
import {Page} from '../common/Page'

export function StyleGuide(): ReactElement {
  return (
    <Page title='Style guide'>
      <Typography/>
      <Forms/>
      <Layout/>
      <Icons/>
    </Page>
  )
}
