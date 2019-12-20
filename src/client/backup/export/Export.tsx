import React from 'react'
import {Container} from '../../common/Container'
import {Locally} from './locally/Locally'
import {Tabs} from '../../common/Tabs'
import {Externally} from './externally/Externally'
import {BackupLocation} from '../BackupActionCreators'

export function Export() {
  return (
    <Container title='Export'>
      <Tabs titles={['locally', 'GitHub', 'GitLab']}>
        <Locally/>
        <Externally location={BackupLocation.GITHUB}/>
        <Externally location={BackupLocation.GITLAB}/>
      </Tabs>
    </Container>
  )
}
