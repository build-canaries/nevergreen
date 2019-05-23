import React from 'react'
import {Container} from '../../common/Container'
import {Messages} from '../../common/Messages'
import LocallyContainer from './locally/LocallyContainer'
import {Tabs} from '../../common/Tabs'
import ExternallyContainer from './externally/ExternallyContainer'
import {GitHubHelp} from './externally/GitHubHelp'
import {GitLabHelp} from './externally/GitLabHelp'
import {BackupLocation} from '../../actions/BackupActionCreators'

interface ExportProps {
  configuration: string;
  infos: string[];
  errors: string[];
}

export function Export({configuration, infos, errors}: ExportProps) {
  return (
    <Container title='Export'>
      <Tabs titles={['locally', 'GitHub', 'GitLab']}>
        <LocallyContainer configuration={configuration}/>
        <ExternallyContainer location={BackupLocation.GITHUB} help={<GitHubHelp/>}/>
        <ExternallyContainer location={BackupLocation.GITLAB} help={<GitLabHelp/>}/>
      </Tabs>
      <Messages type='error' messages={errors}/>
      <Messages type='info' messages={infos}/>
    </Container>
  )
}
