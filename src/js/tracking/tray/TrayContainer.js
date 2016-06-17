import React, {Component, PropTypes} from 'react'
import SelectedProjectsStore from '../../stores/SelectedProjectsStore'
import {selectProject, removeProject} from './TrayActions'
import FetchedProjectsStore from '../../stores/FetchedProjectsStore'
import Tray from './Tray'

function mapStateToProps(props) {
  return {
    projects: FetchedProjectsStore.getAll(props.tray.trayId),
    selectedProjects: SelectedProjectsStore.getForTray(props.tray.trayId),
    selectProject,
    removeProject,
    removeTray: () => {
      props.removeTray(props.tray.trayId)
    },
    refreshTray: () => {
      props.refreshTray(props.tray)
    },
    index: props.index,
    tray: props.tray,
    updateTray: props.updateTray
  }
}

class TrayContainer extends Component {
  constructor(props) {
    super(props)
    this.state = mapStateToProps(props)
  }

  componentDidMount() {
    const callback = () => this.setState(mapStateToProps(this.props))
    this.setState({callback})

    SelectedProjectsStore.addListener(callback)
    FetchedProjectsStore.addListener(callback)
  }

  componentWillUnmount() {
    SelectedProjectsStore.removeListener(this.state.callback)
    FetchedProjectsStore.removeListener(this.state.callback)
  }

  render() {
    return <Tray {...this.state}/>
  }
}

TrayContainer.propTypes = {
  index: PropTypes.number.isRequired,
  tray: PropTypes.shape({
    trayId: PropTypes.string.isRequired
  }).isRequired,
  removeTray: PropTypes.func.isRequired,
  refreshTray: PropTypes.func.isRequired,
  updateTray: PropTypes.func.isRequired
}

export default TrayContainer
