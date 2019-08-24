import React, {useState} from 'react'
import {random} from 'lodash'
import {ScaledGrid} from '../common/scale/ScaledGrid'
import {InterestingProject} from '../common/project/InterestingProject'
import {randomDateInPast} from '../common/DateTime'
import {generateRandomName} from '../domain/Tray'
import {ProjectSummary} from '../common/project/ProjectSummary'
import {ProjectError} from '../common/project/ProjectError'
import styles from './display-preview.scss'
import {useSelector} from 'react-redux'
import {
  getShowBrokenBuildTime,
  getShowBuildLabel,
  getShowBuildTime,
  getShowPrognosis,
  getShowTrayName
} from './SettingsReducer'

function randomBuildLabel() {
  return `${random(1, 9999)}`
}

export function DisplayPreview() {
  const showTrayName = useSelector(getShowTrayName)
  const showBuildTime = useSelector(getShowBuildTime)
  const showBrokenBuildTime = useSelector(getShowBrokenBuildTime)
  const showBuildLabel = useSelector(getShowBuildLabel)
  const showPrognosis = useSelector(getShowPrognosis)

  const [trayName] = useState(generateRandomName())
  const [lastBuildLabel] = useState(randomBuildLabel())
  const [lastBuildTime] = useState(randomDateInPast())
  const [thisBuildTime] = useState(randomDateInPast())
  const [additionalProjects] = useState(random(1, 99))

  const projects = showPrognosis.map((prognosis) => {
    return (
      <InterestingProject key={prognosis}
                          trayName={trayName}
                          name={prognosis.replace('-', ' ')}
                          prognosis={prognosis}
                          lastBuildTime={lastBuildTime}
                          lastBuildLabel={lastBuildLabel}
                          showBrokenBuildTimers={showBrokenBuildTime}
                          showTrayName={showTrayName}
                          showBuildLabel={showBuildLabel}
                          thisBuildTime={thisBuildTime}
                          showBuildTimers={showBuildTime}/>
    )
  })

  return (
    <section className={styles.previewSection}>
      <h3 className={styles.title}>Preview</h3>
      <div className={styles.displayPreview}>
        <ScaledGrid>
          <ProjectError error='some tray error'/>
          {projects}
          <ProjectSummary additionalProjectsCount={additionalProjects}/>
        </ScaledGrid>
      </div>
    </section>
  )
}
