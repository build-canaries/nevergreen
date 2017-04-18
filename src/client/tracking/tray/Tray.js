import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../../common/container/Container'
import AvailableProjectsContainer from '../projects/AvailableProjectsContainer'
import TraySettingsContainer from '../settings/TraySettingsContainer'
import Loading from '../../common/loading/Loading'
import Messages from '../../common/messages/Messages'
import Tabs from '../../common/tabs/Tabs'

class Tray extends Component {
  constructor(props) {
    super(props)
    this.state = {hidden: false}
  }

  componentWillUnmount() {
    if (this.props.highlight) {
      this.props.clearTrayHighlight(this.props.trayId)
    }
  }

  render() {
    let projectsView = null

    if (this.props.errors) {
      projectsView = <Messages type='error' messages={this.props.errors}/>
    } else {
      projectsView =
        <Loading loaded={this.props.loaded}>
          <AvailableProjectsContainer trayId={this.props.trayId} index={this.props.index}/>
        </Loading>
    }

    const title = this.props.name || this.props.url
    const subTitle = this.props.name ? this.props.url : ''

    return (
      <Container title={title} subTitle={subTitle} className='tray' highlight={this.props.highlight}>
        <div data-locator='tray'>
          <Tabs titles={['projects', 'settings']}>
            {projectsView}
            <TraySettingsContainer trayId={this.props.trayId}/>
          </Tabs>
        </div>
      </Container>
    )
  }
}

Tray.propTypes = {
  trayId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  loaded: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  url: PropTypes.string.isRequired,
  clearTrayHighlight: PropTypes.func.isRequired,
  highlight: PropTypes.bool
}

export default Tray
