import React from 'react'
import PropTypes from 'prop-types'
import {Container} from '../../common/Container'
import {Messages} from '../../common/Messages'
import LocallyContainer from './locally/LocallyContainer'
import GitHubContainer from './github/GitHubContainer'
import GitLabContainer from './gitlab/GitLabContainer'
import {Tabs} from '../../common/Tabs'

export function Import({infos, errors}) {
  return (
    <Container title='Import'>
      <Tabs titles={['locally', 'GitHub', 'GitLab']}>
        <LocallyContainer/>
        <GitHubContainer/>
        <GitLabContainer/>
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
