import React, {Component, PropTypes} from 'react'
import Container from '../../common/container/Container'
import AvailableProjects from '../projects/AvailableProjects'
import TraySettings from '../settings/TraySettings'
import Loading from '../../common/loading/Loading'
import Messages from '../../common/messages/Messages'
import ProjectsSubMenu from '../projects/SubMenu'
import SettingsSubMenu from '../settings/SubMenu'
import './tray.scss'

class Tray extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSettings: false,
      hidden: false
    }
  }

  componentDidMount() {
    if (this.props.projects.length === 0) {
      this.props.refreshTray(this.props)
    }
  }

  render() {
    const updateTray = (trayId, name, url, username, oldPassword, newPassword) => {
      this.setState({showSettings: false})
      this.props.updateTray(trayId, name, url, username, oldPassword, newPassword)
    }
    const toggleSettingsView = () => this.setState({showSettings: !this.state.showSettings})
    const refreshTray = () => this.props.refreshTray(this.props)

    let subContent

    if (this.state.showSettings) {
      subContent = <TraySettings {...this.props} updateTray={updateTray} cancel={toggleSettingsView}/>
    } else {
      if (this.props.errors) {
        subContent = <Messages type='notification' messages={this.props.errors}/>
      } else {
        subContent = <AvailableProjects index={this.props.index}
                                        trayId={this.props.trayId}
                                        projects={this.props.projects}
                                        selected={this.props.selected}
                                        selectProject={this.props.selectProject}/>
      }
    }

    const title = this.props.name || this.props.url
    const subTitle = this.props.name ? this.props.url : ''

    return (
      <Container title={title} subTitle={subTitle} className='tray'>
        <div>
          {this.state.showSettings ?
            <SettingsSubMenu index={this.props.index} toggleSettingsView={toggleSettingsView}/> :
            <ProjectsSubMenu loaded={this.props.loaded} index={this.props.index} timestamp={this.props.timestamp}
                             refreshTray={refreshTray} toggleSettingsView={toggleSettingsView}/>}
          <div>
            <Loading loaded={this.props.loaded}>
              {subContent}
            </Loading>
          </div>
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
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  timestamp: PropTypes.string,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeTray: PropTypes.func.isRequired,
  refreshTray: PropTypes.func.isRequired,
  updateTray: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired
}

export default Tray
