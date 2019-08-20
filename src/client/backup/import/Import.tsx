import React from 'react'
import {Container} from '../../common/Container'
import LocallyContainer from './locally/LocallyContainer'
import {Tabs} from '../../common/Tabs'
import Externally from './externally/ExternallyContainer'
import {GitHubHelp} from './externally/GitHubHelp'
import {GitLabHelp} from './externally/GitLabHelp'
import {BackupLocation} from '../BackupActionCreators'

export function Import() {
  return (
    <Container title='Import'>
      <Tabs titles={['locally', 'GitHub', 'GitLab']}>
        <LocallyContainer/>
        <Externally location={BackupLocation.GITHUB} help={<GitHubHelp/>}/>
        <Externally location={BackupLocation.GITLAB} help={<GitLabHelp/>} accessTokenRequired/>
      </Tabs>
    </Container>
  )
}
