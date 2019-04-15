import React from 'react'
import PropTypes from 'prop-types'
import {Container} from '../../common/Container'
import {Messages} from '../../common/Messages'
import LocallyContainer from './locally/LocallyContainer'
import {Tabs} from '../../common/Tabs'
import ExternallyContainer from './externally/ExternallyContainer'
import {GitHubHelp} from './externally/GitHubHelp'
import {GitLabHelp} from './externally/GitLabHelp'

export function Export({configuration, infos, errors}) {
  return (
    <Container title='Export'>
      <Tabs titles={['locally', 'GitHub', 'GitLab']}>
        <LocallyContainer configuration={configuration}/>
        <ExternallyContainer location='github' help={<GitHubHelp/>}/>
        <ExternallyContainer location='gitlab' help={<GitLabHelp/>}/>
      </Tabs>
      <Messages type='error' messages={errors}/>
      <Messages type='info' messages={infos}/>
    </Container>
  )
}

Export.propTypes = {
  configuration: PropTypes.string,
  infos: PropTypes.arrayOf(PropTypes.string),
  errors: PropTypes.arrayOf(PropTypes.string)
}
