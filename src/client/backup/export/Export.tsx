import React from 'react'
import {Container} from '../../common/Container'
import {Locally} from './locally/Locally'
import {Tabs} from '../../common/Tabs'
import {Externally} from './externally/Externally'
import {GitHubHelp} from './externally/GitHubHelp'
import {GitLabHelp} from './externally/GitLabHelp'
import {BackupLocation} from '../BackupActionCreators'

export function Export() {
  return (
    <Container title='Export'>
      <Tabs titles={['locally', 'GitHub', 'GitLab']}>
        <Locally/>
        <Externally location={BackupLocation.GITHUB} help={<GitHubHelp/>}/>
        <Externally location={BackupLocation.GITLAB} help={<GitLabHelp/>}/>
      </Tabs>
    </Container>
  )
}
