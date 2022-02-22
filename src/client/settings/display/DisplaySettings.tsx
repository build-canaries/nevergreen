import React, {ReactElement} from 'react'
import {Checkbox} from '../../common/forms/Checkbox'
import {DropDown} from '../../common/forms/DropDown'
import styles from './display-settings.scss'
import {DisplayPrognosisSelection} from './DisplayPrognosisSelection'
import {useDispatch, useSelector} from 'react-redux'
import {
  setClickToShowMenu,
  setMaxProjectsToShow,
  setShowBuildLabel,
  setShowBuildTime,
  setShowFeedIdentifier,
  setSort
} from '../SettingsActionCreators'
import {
  getClickToShowMenu,
  getMaxProjectsToShow,
  getShowBuildLabel,
  getShowBuildTime,
  getShowFeedIdentifier,
  getSort,
  MaxProjectsToShow
} from '../SettingsReducer'
import {SortBy} from '../../gateways/ProjectsGateway'
import {LinkButton} from '../../common/LinkButton'
import {Page} from '../../common/Page'
import {Eye} from '../../common/icons/Eye'
import {Display} from '../../common/icons/Display'
import {routePreview} from '../../AppRoutes'

export function DisplaySettings(): ReactElement {
  const dispatch = useDispatch()
  const clickToShowMenu = useSelector(getClickToShowMenu)
  const showFeedIdentifier = useSelector(getShowFeedIdentifier)
  const showBuildTime = useSelector(getShowBuildTime)
  const showBuildLabel = useSelector(getShowBuildLabel)
  const maxProjectsToShow = useSelector(getMaxProjectsToShow)
  const sort = useSelector(getSort)

  const projectsToShowOptions = [
    {value: MaxProjectsToShow.small, display: 'Small'},
    {value: MaxProjectsToShow.medium, display: 'Medium'},
    {value: MaxProjectsToShow.large, display: 'Large'},
    {value: MaxProjectsToShow.all, display: 'All (not recommended)'}
  ]

  const sortOptions = [
    {value: SortBy.default, display: 'Default'},
    {value: SortBy.description, display: 'Description'},
    {value: SortBy.prognosis, display: 'Prognosis'},
    {value: SortBy.timestamp, display: 'Timestamp'}
  ]

  return (
    <Page title='Display settings' icon={<Display/>}>
      <Checkbox checked={clickToShowMenu}
                onToggle={(newValue) => dispatch(setClickToShowMenu(newValue))}>
        Click to show menu
      </Checkbox>
      <Checkbox checked={showFeedIdentifier}
                onToggle={(newValue) => dispatch(setShowFeedIdentifier(newValue))}>
        Show feed identifier
      </Checkbox>
      <Checkbox checked={showBuildTime}
                onToggle={(newValue) => dispatch(setShowBuildTime(newValue))}>
        Show build time
      </Checkbox>
      <Checkbox checked={showBuildLabel}
                onToggle={(newValue) => dispatch(setShowBuildLabel(newValue))}>
        Show build label
      </Checkbox>

      <DisplayPrognosisSelection/>

      <DropDown className={styles.dropDown}
                options={projectsToShowOptions}
                value={maxProjectsToShow}
                onChange={({target}) => dispatch(setMaxProjectsToShow(target.value as MaxProjectsToShow))}>
        <span className={styles.dropDownLabel}>Amount of project to show</span>
      </DropDown>

      <DropDown className={styles.dropDown}
                options={sortOptions}
                value={sort}
                onChange={({target}) => dispatch(setSort(target.value as SortBy))}>
        <span className={styles.dropDownLabel}>Sort projects by</span>
      </DropDown>

      <LinkButton to={routePreview}
                  className={styles.preview}
                  icon={<Eye/>}>
        Preview display
      </LinkButton>
    </Page>
  )
}
