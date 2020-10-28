import React, {ReactElement} from 'react'
import {Title} from '../common/Title'
import {SuccessMessages} from './SuccessMessages'

export function Success(): ReactElement {
  return (
    <>
      <Title>Success</Title>
      <SuccessMessages/>
    </>
  )
}
