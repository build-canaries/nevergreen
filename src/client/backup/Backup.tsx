import React from 'react'
import {Schema} from './Schema'
import {Import} from './import/Import'
import {Export} from './export/Export'
import {Reset} from './reset/Reset'
import {Title} from '../common/Title'

export function Backup() {
  return (
    <>
      <Title>Backup</Title>
      <Import/>
      <Export/>
      <Schema/>
      <Reset/>
    </>
  )
}
