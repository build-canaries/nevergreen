import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../../common/container/Container'
import Messages from '../../common/messages/Messages'
import LocallyContainer from './locally/LocallyContainer'
import GitHubContainer from './github/GitHubContainer'
import Tabs from '../../common/tabs/Tabs'

class Import extends Component {
  render() {
    return (
      <Container title='Import'>
        <Tabs titles={['locally', 'GitHub']}>
          <LocallyContainer/>
          <GitHubContainer/>
        </Tabs>
        <Messages type='error' messages={this.props.errors}/>
        <Messages type='info' messages={this.props.infos}/>
      </Container>
    )
  }
}

Import.propTypes = {
  infos: PropTypes.arrayOf(PropTypes.string),
  errors: PropTypes.arrayOf(PropTypes.string)
}

export default Import
