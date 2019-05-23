import React from 'react'
import {Schema} from './Schema'
import ImportContainer from './import/ImportContainer'
import ExportContainer from './export/ExportContainer'
import {Title} from '../common/Title'

interface BackupProps {
  schema: string;
}

export function Backup({schema}: BackupProps) {
  return (
    <>
      <Title>Backup</Title>
      <ImportContainer/>
      <ExportContainer/>
      <Schema schema={schema}/>
    </>
  )
}
