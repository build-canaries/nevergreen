import React, {useState} from 'react'
import _ from 'lodash'
import {Prognosis} from '../domain/Project'
import {Container} from '../common/Container'
import {Checkbox} from '../common/forms/Checkbox'
import {ScaledGrid} from '../common/scale/ScaledGrid'
import {InterestingProject} from '../common/project/InterestingProject'
import {randomDateInPast} from '../common/DateTime'
import {generateRandomName} from '../domain/Tray'
import {DropDown} from '../common/forms/DropDown'
import {ProjectSummary} from '../common/project/ProjectSummary'
import {ProjectError} from '../common/project/ProjectError'
import styles from './display-settings.scss'

export interface DisplaySettingsProps {
  showTrayName: boolean;
  showBuildTime: boolean;
  showBrokenBuildTime: boolean;
  showBuildLabel: boolean;
  maxProjectsToShow: number;
  setShowBuildTime: (show: boolean) => void;
  setShowBrokenBuildTime: (show: boolean) => void;
  setShowTrayName: (show: boolean) => void;
  setShowBuildLabel: (show: boolean) => void;
  setMaxProjectsToShow: (show: string) => void;
  validNumberOfProjectsToShow: number[];
}

function randomBuildLabel() {
  return `${_.random(1, 9999)}`
}

export function DisplaySettings({
                                  validNumberOfProjectsToShow,
                                  showTrayName,
                                  showBuildTime,
                                  showBrokenBuildTime,
                                  showBuildLabel,
                                  maxProjectsToShow,
                                  setShowBrokenBuildTime,
                                  setShowBuildTime,
                                  setShowTrayName,
                                  setShowBuildLabel,
                                  setMaxProjectsToShow
                                }: DisplaySettingsProps) {

  const [trayName] = useState(generateRandomName())
  const [lastBuildLabel] = useState(randomBuildLabel())
  const [lastBuildTime] = useState(randomDateInPast())
  const [thisBuildTime] = useState(randomDateInPast())
  const [additionalProjects] = useState(_.random(1, 99))

  const projectsToShowOptions = validNumberOfProjectsToShow.map((value) => {
    const display = value === Number.MAX_SAFE_INTEGER
      ? 'all projects (not recommended)'
      : `${value.toString()} projects`
    return {value: value.toString(), display}
  })

  return (
    <Container title='display' className={styles.container}>
      <Checkbox className={styles.showTrayName}
                checked={showTrayName}
                onToggle={(newValue) => setShowTrayName(newValue)}
                data-locator='show-tray-names'>
        show tray name
      </Checkbox>
      <Checkbox className={styles.checkbox}
                checked={showBuildTime}
                onToggle={(newValue) => setShowBuildTime(newValue)}
                data-locator='show-build-times'>
        show building timer
      </Checkbox>
      <Checkbox className={styles.checkbox}
                checked={showBrokenBuildTime}
                onToggle={(newValue) => setShowBrokenBuildTime(newValue)}
                data-locator='show-broken-build-times'>
        show broken build timer
      </Checkbox>
      <Checkbox className={styles.checkbox}
                checked={showBuildLabel}
                onToggle={(newValue) => setShowBuildLabel(newValue)}
                data-locator='show-build-labels'>
        show broken build label
      </Checkbox>
      <DropDown className={styles.maxProjects}
                options={projectsToShowOptions}
                value={maxProjectsToShow}
                onChange={({target}) => setMaxProjectsToShow(target.value)}
                data-locator='max-projects-to-show'>
        max number of projects to show
      </DropDown>
      <section className={styles.previewSection}>
        <h3 className={styles.title}>Preview</h3>
        <div className={styles.displayPreview}>
          <ScaledGrid>
            <ProjectError error='some tray error'/>
            <InterestingProject trayName={trayName}
                                name='sick'
                                prognosis={Prognosis.sick}
                                lastBuildTime={lastBuildTime}
                                lastBuildLabel={lastBuildLabel}
                                showBrokenBuildTimers={showBrokenBuildTime}
                                showTrayName={showTrayName}
                                showBuildLabel={showBuildLabel}/>
            <InterestingProject trayName={trayName}
                                name='sick building'
                                prognosis={Prognosis.sickBuilding}
                                thisBuildTime={thisBuildTime}
                                showBuildTimers={showBuildTime}
                                showTrayName={showTrayName}/>
            <InterestingProject trayName={trayName}
                                name='healthy building'
                                prognosis={Prognosis.healthyBuilding}
                                thisBuildTime={thisBuildTime}
                                showBuildTimers={showBuildTime}
                                showTrayName={showTrayName}/>
            <InterestingProject trayName={trayName}
                                name='unknown prognosis'
                                prognosis={Prognosis.unknown}
                                showTrayName={showTrayName}/>
            <ProjectSummary additionalProjectsCount={additionalProjects}/>
          </ScaledGrid>
        </div>
      </section>
    </Container>
  )
}
