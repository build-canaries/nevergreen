import React, {Component, PropTypes} from 'react'
import Container from '../../common/container/Container'
import Messages from '../../common/messages/Messages'
import LocallyContainer from './locally/LocallyContainer'
import GitHubContainer from './github/GitHubContainer'
import Tabs from '../../common/tabs/Tabs'
import './export.scss'

class Export extends Component {
  render() {
    return (
      <Container title='export' className='export'>
        <Messages type='error' messages={this.props.errors}/>
        <Messages type='info' messages={this.props.infos}/>
        <Tabs titles={['locally', 'GitHub']}>
          <LocallyContainer configuration={this.props.configuration}/>
          <GitHubContainer configuration={this.props.configuration}/>
        </Tabs>
      </Container>
    )
  }
}

Export.propTypes = {
  configuration: PropTypes.string,
  loaded: PropTypes.bool,
  infos: PropTypes.arrayOf(PropTypes.string),
  errors: PropTypes.arrayOf(PropTypes.string)
}

export default Export
