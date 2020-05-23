import React, {ReactElement} from 'react'
import {Title} from '../common/Title'
import {Typography} from './Typography'
import {Forms} from './Forms'
import {Layout} from './Layout'
import {Icons} from './Icons'

export function StyleGuide(): ReactElement {
  return (
    <>
      <Title>Style Guide</Title>
      <Typography/>
      <Forms/>
      <Layout/>
      <Icons/>
    </>
  )
}
