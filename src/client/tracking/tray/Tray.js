import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../../common/container/Container'
import AvailableProjects from '../projects/AvailableProjects'
import TraySettingsContainer from '../settings/TraySettingsContainer'
import Loading from '../../common/loading/Loading'
import Messages from '../../common/messages/Messages'
import Tabs from '../../common/tabs/Tabs'

class Tray extends Component {
  constructor(props) {
    super(props)
    this.state = {hidden: false}
  }

  componentDidMount() {
    if (this.props.projects.length === 0 && this.props.loaded) {
      this.props.refreshTray(this.props)
    }
  }

  componentWillUnmount() {
    if (this.props.highlight) {
      this.props.clearTrayHighlight(this.props.trayId)
    }
  }

  render() {
    const refreshTray = () => this.props.refreshTray(this.props, this.props.pendingRequest)

    let projectsView = null

    if (this.props.errors) {
      projectsView = <Messages type='error' messages={this.props.errors}/>
    } else {
      projectsView =
        <Loading loaded={this.props.loaded}>
          <AvailableProjects index={this.props.index} trayId={this.props.trayId} projects={this.props.projects}
                             selected={this.props.selected} selectProject={this.props.selectProject} loaded={this.props.loaded}
                             timestamp={this.props.timestamp} refreshTray={refreshTray}/>
        </Loading>
    }

    const title = this.props.name || this.props.url
    const subTitle = this.props.name ? this.props.url : ''

    return (
      <Container title={title} subTitle={subTitle} className='tray' highlight={this.props.highlight}>
        <div data-locator='tray'>
          <Tabs titles={['projects', 'settings']}>
            {projectsView}
            <TraySettingsContainer trayId={this.props.trayId} name={this.props.name} serverType={this.props.serverType} url={this.props.url}
                                   username={this.props.username} password={this.props.password} pendingRequest={this.props.pendingRequest}
                                   refreshTray={refreshTray}/>
          </Tabs>
        </div>
      </Container>
    )
  }
}

Tray.propTypes = {
  loaded: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  index: PropTypes.number.isRequired,
  trayId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  serverType: PropTypes.string,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  timestamp: PropTypes.string,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  refreshTray: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  clearTrayHighlight: PropTypes.func.isRequired,
  highlight: PropTypes.bool,
  pendingRequest: PropTypes.object
}

export default Tray
