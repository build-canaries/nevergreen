import React from 'react'
import {Container} from '../common/Container'
import {Checkbox} from '../common/forms/Checkbox'
import {DropDown} from '../common/forms/DropDown'
import styles from './display-settings.scss'
import {DisplayPreview} from './DisplayPreview'
import {DisplayPrognosisSelection, DisplayPrognosisSelectionProps} from './DisplayPrognosisSelection'

export type DisplaySettingsProps = {
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
} & DisplayPrognosisSelectionProps

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
                                  setMaxProjectsToShow,
                                  showPrognosis,
                                  setShowPrognosis
                                }: DisplaySettingsProps) {

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

      <DisplayPrognosisSelection showPrognosis={showPrognosis}
                                 setShowPrognosis={setShowPrognosis}/>

      <DropDown className={styles.maxProjects}
                options={projectsToShowOptions}
                value={maxProjectsToShow}
                onChange={({target}) => setMaxProjectsToShow(target.value)}
                data-locator='max-projects-to-show'>
        max number of projects to show
      </DropDown>

      <DisplayPreview showBrokenBuildTime={showBrokenBuildTime}
                      showBuildLabel={showBuildLabel}
                      showBuildTime={showBuildTime}
                      showTrayName={showTrayName}
                      showPrognosis={showPrognosis}/>
    </Container>
  )
}
