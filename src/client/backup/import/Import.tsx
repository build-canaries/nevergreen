import React from 'react'
import {Container} from '../../common/Container'
import {Messages} from '../../common/Messages'
import LocallyContainer from './locally/LocallyContainer'
import {Tabs} from '../../common/Tabs'
import Externally from './externally/ExternallyContainer'
import {GitHubHelp} from './externally/GitHubHelp'
import {GitLabHelp} from './externally/GitLabHelp'
import {BackupLocation} from '../../actions/BackupActionCreators'

interface ImportProps {
  infos: string[];
  errors: string[];
}

export function Import({infos, errors}: ImportProps) {
  return (
    <Container title='Import'>
      <Tabs titles={['locally', 'GitHub', 'GitLab']}>
        <LocallyContainer/>
        <Externally location={BackupLocation.GITHUB} help={<GitHubHelp/>}/>
        <Externally location={BackupLocation.GITLAB} help={<GitLabHelp/>} accessTokenRequired/>
      </Tabs>
      <Messages type='error' messages={errors}/>
      <Messages type='info' messages={infos}/>
    </Container>
  )
}
