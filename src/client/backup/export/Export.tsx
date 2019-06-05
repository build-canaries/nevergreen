import React from 'react'
import {Container} from '../../common/Container'
import {Locally} from './locally/Locally'
import {Tabs} from '../../common/Tabs'
import ExternallyContainer from './externally/ExternallyContainer'
import {GitHubHelp} from './externally/GitHubHelp'
import {GitLabHelp} from './externally/GitLabHelp'
import {BackupLocation} from '../../actions/BackupActionCreators'

interface ExportProps {
  configuration: string;
}

export function Export({configuration}: ExportProps) {
  return (
    <Container title='Export'>
      <Tabs titles={['locally', 'GitHub', 'GitLab']}>
        <Locally configuration={configuration}/>
        <ExternallyContainer configuration={configuration} location={BackupLocation.GITHUB} help={<GitHubHelp/>}/>
        <ExternallyContainer configuration={configuration} location={BackupLocation.GITLAB} help={<GitLabHelp/>}/>
      </Tabs>
    </Container>
  )
}
