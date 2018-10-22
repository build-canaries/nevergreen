import React from 'react'
import PropTypes from 'prop-types'
import {Container} from '../../common/container/Container'
import {Messages} from '../../common/messages/Messages'
import LocallyContainer from './locally/LocallyContainer'
import GitHubContainer from './github/GitHubContainer'
import {Tabs} from '../../common/tabs/Tabs'

export function Export({configuration, infos, errors}) {
  return (
    <Container title='Export'>
      <Tabs titles={['locally', 'GitHub']}>
        <LocallyContainer configuration={configuration}/>
        <GitHubContainer configuration={configuration}/>
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
