import React, {Component} from 'react'
import AddTray from './addTray'
import Tray from './tray'
import TrayStore from '../../stores/TrayStore'
import TrayActions from '../../actions/TrayActions'

function getStateFromStore() {
  return {
    trays: TrayStore.getAll()
  }
}

class TrackingSection extends Component {
  constructor(props) {
    super(props)
    this.state = getStateFromStore()
  }

  componentWillMount() {
    const callback = () => this.setState(getStateFromStore())
    this.setState({callback})
    TrayStore.addListener(callback)
  }

  componentWillUnmount() {
    TrayStore.removeListener(this.state.callback)
  }

  render() {
    return (
      <section className='dashboard-main-section'>
        <h2 className='visually-hidden'>Tracking</h2>
        <AddTray addTray={TrayActions.addTray.bind(TrayActions)}/>

        <div>
          {
            this.state.trays.map((tray, index) => {
              return <Tray key={tray.trayId}
                           index={index}
                           tray={tray}
                           removeTray={TrayActions.removeTray.bind(TrayActions, tray.trayId)}
                           refreshTray={TrayActions.refreshTray.bind(TrayActions, tray)}
                           updateTray={TrayActions.updateTray.bind(TrayActions)}/>
            })
          }
        </div>
      </section>
    )
  }
}

export default TrackingSection
