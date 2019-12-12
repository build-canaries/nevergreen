import React from 'react'
import {Container} from '../common/Container'
import {Checkbox} from '../common/forms/Checkbox'
import {DropDown} from '../common/forms/DropDown'
import styles from './display-settings.scss'
import {DisplayPreview} from './DisplayPreview'
import {DisplayPrognosisSelection} from './DisplayPrognosisSelection'
import {useDispatch, useSelector} from 'react-redux'
import {
  setMaxProjectsToShow,
  setShowBrokenBuildTime,
  setShowBuildLabel,
  setShowBuildTime,
  setShowTrayName,
  VALID_PROJECTS_TO_SHOW
} from './SettingsActionCreators'
import {
  getMaxProjectsToShow,
  getShowBrokenBuildTime,
  getShowBuildLabel,
  getShowBuildTime,
  getShowTrayName
} from './SettingsReducer'

export function DisplaySettings() {
  const dispatch = useDispatch()
  const showTrayName = useSelector(getShowTrayName)
  const showBuildTime = useSelector(getShowBuildTime)
  const showBrokenBuildTime = useSelector(getShowBrokenBuildTime)
  const showBuildLabel = useSelector(getShowBuildLabel)
  const maxProjectsToShow = useSelector(getMaxProjectsToShow)

  const projectsToShowOptions = VALID_PROJECTS_TO_SHOW.map((value) => {
    const display = value === Number.MAX_SAFE_INTEGER
      ? 'all projects (not recommended)'
      : `${value.toString()} projects`
    return {value: value.toString(), display}
  })

  return (
    <Container title='Display' className={styles.container}>
      <Checkbox className={styles.showTrayName}
                checked={showTrayName}
                onToggle={(newValue) => dispatch(setShowTrayName(newValue))}
                data-locator='show-tray-names'>
        show tray name
      </Checkbox>
      <Checkbox className={styles.checkbox}
                checked={showBuildTime}
                onToggle={(newValue) => dispatch(setShowBuildTime(newValue))}
                data-locator='show-build-times'>
        show building timer
      </Checkbox>
      <Checkbox className={styles.checkbox}
                checked={showBrokenBuildTime}
                onToggle={(newValue) => dispatch(setShowBrokenBuildTime(newValue))}
                data-locator='show-broken-build-times'>
        show broken build timer
      </Checkbox>
      <Checkbox className={styles.checkbox}
                checked={showBuildLabel}
                onToggle={(newValue) => dispatch(setShowBuildLabel(newValue))}
                data-locator='show-build-labels'>
        show broken build label
      </Checkbox>

      <DisplayPrognosisSelection/>

      <DropDown className={styles.maxProjects}
                options={projectsToShowOptions}
                value={maxProjectsToShow}
                onChange={({target}) => dispatch(setMaxProjectsToShow(target.value))}
                data-locator='max-projects-to-show'>
        max number of projects to show
      </DropDown>

      <DisplayPreview/>
    </Container>
  )
}
