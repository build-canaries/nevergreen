import React from 'react'
import {Container} from '../../common/Container'
import {Locally} from './locally/Locally'
import {Tabs} from '../../common/Tabs'
import {Externally} from './externally/Externally'
import {BackupLocation} from '../BackupActionCreators'

export function Import() {
  return (
    <Container title='Import'>
      <Tabs titles={['Locally', 'GitHub', 'GitLab']}>
        <Locally/>
        <Externally location={BackupLocation.GITHUB}/>
        <Externally location={BackupLocation.GITLAB} accessTokenRequired/>
      </Tabs>
    </Container>
  )
}
