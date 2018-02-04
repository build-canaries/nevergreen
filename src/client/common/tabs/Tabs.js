import React, {Children, Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import styles from './tabs.scss'

class Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {active: 0}
  }

  switchTabs = (index) => {
    this.setState({active: index})
  }

  render() {
    return (
      <Fragment>
        <div className={styles.tabs}>
          {this.props.titles.map((title, i) => {
            const isActive = i === this.state.active
            return (
              <button key={title} className={styles.tab} onClick={() => this.switchTabs(i)} disabled={isActive}
                      data-locator={`tab-${title}`}>
                {title}
              </button>
            )
          })}
        </div>
        <div className={styles.contents}>
          {Children.toArray(this.props.children)[this.state.active]}
        </div>
      </Fragment>
    )
  }
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Tabs
