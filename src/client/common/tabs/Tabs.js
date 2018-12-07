import React, {Children} from 'react'
import PropTypes from 'prop-types'
import {Tab, TabList, TabPanel, Tabs as ReactTabs} from 'react-tabs'
import styles from './tabs.scss'

export function Tabs({titles, children, onSwitch}) {
  return (
    <ReactTabs onSelect={() => onSwitch && onSwitch()}
               forceRenderTabPanel>
      <TabList className={styles.tabs}>
        {
          titles.map((title) => {
            return (
              <Tab key={title}
                   className={styles.tab}
                   selectedClassName={styles.tabSelected}
                   data-locator={`tab-${title}`}>
                {title}
              </Tab>
            )
          })
        }
      </TabList>
      {
        Children.toArray(children).map((child, i) => {
          return (
            <TabPanel key={i}
                      className={styles.tabPanel}
                      selectedClassName={styles.tabPanelSelected}>
              {child}
            </TabPanel>
          )
        })
      }
    </ReactTabs>
  )
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSwitch: PropTypes.func
}
