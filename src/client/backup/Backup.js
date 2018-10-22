import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Schema} from './Schema'
import ImportContainer from './import/ImportContainer'
import ExportContainer from './export/ExportContainer'
import {Title} from '../common/Title'

export function Backup({schema}) {
  return (
    <Fragment>
      <Title>Backup</Title>
      <ImportContainer/>
      <ExportContainer/>
      <Schema schema={schema}/>
    </Fragment>
  )
}

Backup.propTypes = {
  schema: PropTypes.string
}
