import React, {ReactElement} from 'react'
import {Schema} from './Schema'
import {LocalBackup} from './local/LocalBackup'
import {Reset} from './reset/Reset'
import {Title} from '../common/Title'
import {RemoteBackups} from './remote/RemoteBackups'

export function Backup(): ReactElement {
  return (
    <>
      <Title>Backup</Title>
      <RemoteBackups/>
      <LocalBackup/>
      <Reset/>
      <Schema/>
    </>
  )
}
