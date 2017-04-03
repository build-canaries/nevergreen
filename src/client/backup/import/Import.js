import React, {Component, PropTypes} from 'react'
import Container from '../../common/container/Container'
import Messages from '../../common/messages/Messages'
import LocallyContainer from './locally/LocallyContainer'
import GitHubContainer from './github/GitHubContainer'
import Tabs from '../../common/tabs/Tabs'
import './import.scss'

class Import extends Component {
  render() {
    return (
      <Container title='import' className='import'>
        <Messages type='error' messages={this.props.errors}/>
        <Messages type='info' messages={this.props.infos}/>
        <Tabs titles={['locally', 'GitHub']}>
          <LocallyContainer/>
          <GitHubContainer/>
        </Tabs>
      </Container>
    )
  }
}

Import.propTypes = {
  infos: PropTypes.arrayOf(PropTypes.string),
  errors: PropTypes.arrayOf(PropTypes.string)
}

export default Import
