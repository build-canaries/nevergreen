import React from 'react'
import PropTypes from 'prop-types'
import {Container} from '../../common/Container'
import {Messages} from '../../common/Messages'
import LocallyContainer from './locally/LocallyContainer'
import {Tabs} from '../../common/Tabs'
import Externally from './externally/ExternallyContainer'
import {GitHubHelp} from './externally/GitHubHelp'
import {GitLabHelp} from './externally/GitLabHelp'

export function Import({infos, errors}) {
  return (
    <Container title='Import'>
      <Tabs titles={['locally', 'GitHub', 'GitLab']}>
        <LocallyContainer/>
        <Externally location='github' help={<GitHubHelp/>}/>
        <Externally location='gitlab' help={<GitLabHelp/>} accessTokenRequired/>
      </Tabs>
      <Messages type='error' messages={errors}/>
      <Messages type='info' messages={infos}/>
    </Container>
  )
}

Import.propTypes = {
  infos: PropTypes.arrayOf(PropTypes.string),
  errors: PropTypes.arrayOf(PropTypes.string)
}
