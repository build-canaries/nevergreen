import React from 'react'
import {Schema} from './Schema'
import {Import} from './import/Import'
import ExportContainer from './export/ExportContainer'
import {Title} from '../common/Title'

interface BackupProps {
  schema: string;
}

export function Backup({schema}: BackupProps) {
  return (
    <>
      <Title>Backup</Title>
      <Import/>
      <ExportContainer/>
      <Schema schema={schema}/>
    </>
  )
}
