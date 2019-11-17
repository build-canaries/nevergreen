import React, {Children, ReactElement} from 'react'
import {Tab, TabList, TabPanel, Tabs as ReactTabs} from 'react-tabs'
import styles from './tabs.scss'

interface TabsProps {
  readonly children: ReactElement[];
  readonly titles: ReadonlyArray<string>;
}

export function Tabs({titles, children}: TabsProps) {
  return (
    <ReactTabs forceRenderTabPanel>
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
