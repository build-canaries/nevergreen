import React, {Children, Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import styles from './tabs.scss'

export class Tabs extends Component {

  constructor(props) {
    super(props)
    this.state = {active: 0}
  }

  switchTabs = (index) => {
    if (index !== this.state.active) {
      const onSwitch = () => this.props.onSwitch && this.props.onSwitch()
      this.setState({active: index}, onSwitch)
    }
  }

  render() {
    const prefix = _.uniqueId('tabs')

    return (
      <Fragment>
        <div className={styles.tabs}
             role='tablist'
             data-locator='tab-bar'>
          {
            this.props.titles.map((title, i) => {
              const isActive = i === this.state.active

              return (
                <button key={title}
                        className={styles.tab}
                        onClick={() => this.switchTabs(i)}
                        disabled={isActive}
                        aria-selected={isActive}
                        role='tab'
                        data-locator={`tab-${title}`}
                        id={`tab-${prefix}-${i}`}
                        aria-controls={`tab-panel-${prefix}-${i}`}>
                  {title}
                </button>
              )
            })
          }
        </div>
        {
          Children.toArray(this.props.children).map((child, i) => {
            const isActive = i === this.state.active
            const classes = classNames(styles.tabPanel, {
              [styles.hidden]: !isActive
            })

            return (
              <div key={`tab-panel-${prefix}-${i}`}
                   className={classes}
                   tabIndex='0'
                   role='tabpanel'
                   id={`tab-panel-${prefix}-${i}`}
                   data-locator={`tab-panel-${i}`}
                   aria-labelledby={`tab-${prefix}-${i}`}>
                {child}
              </div>
            )
          })
        }
      </Fragment>
    )
  }
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSwitch: PropTypes.func
}
