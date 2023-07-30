import type { ReactElement } from 'react'
import { Checkbox } from '../../common/forms/Checkbox'
import { DropDown } from '../../common/forms/DropDown'
import { DisplayPrognosisSelection } from './DisplayPrognosisSelection'
import {
  getMaxProjectsToShow,
  getShowBuildLabel,
  getShowBuildTime,
  getShowFeedIdentifier,
  getSort,
  MaxProjectsToShow,
  setMaxProjectsToShow,
  setShowBuildLabel,
  setShowBuildTime,
  setShowFeedIdentifier,
  setSort,
  SortBy,
} from './DisplaySettingsReducer'
import { LinkButton } from '../../common/LinkButton'
import { Page } from '../../common/Page'
import { Eye } from '../../common/icons/Eye'
import { Display } from '../../common/icons/Display'
import { RoutePaths } from '../../AppRoutes'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import styles from './display-settings.scss'

const projectsToShowOptions = [
  { value: MaxProjectsToShow.small, display: 'Small' },
  { value: MaxProjectsToShow.medium, display: 'Medium' },
  { value: MaxProjectsToShow.large, display: 'Large' },
  { value: MaxProjectsToShow.all, display: 'All (not recommended)' },
]

const sortOptions = [
  { value: SortBy.default, display: 'Default' },
  { value: SortBy.description, display: 'Description' },
  { value: SortBy.prognosis, display: 'Prognosis' },
  { value: SortBy.timestamp, display: 'Timestamp' },
]

export function DisplaySettingsPage(): ReactElement {
  const dispatch = useAppDispatch()
  const showFeedIdentifier = useAppSelector(getShowFeedIdentifier)
  const showBuildTime = useAppSelector(getShowBuildTime)
  const showBuildLabel = useAppSelector(getShowBuildLabel)
  const maxProjectsToShow = useAppSelector(getMaxProjectsToShow)
  const sort = useAppSelector(getSort)

  return (
    <Page title="Display settings" icon={<Display />}>
      <LinkButton to={RoutePaths.preview} icon={<Eye />}>
        Preview display
      </LinkButton>
      <Checkbox
        checked={showFeedIdentifier}
        onToggle={(newValue) => dispatch(setShowFeedIdentifier(newValue))}
      >
        Show feed identifier
      </Checkbox>
      <Checkbox
        checked={showBuildTime}
        onToggle={(newValue) => dispatch(setShowBuildTime(newValue))}
      >
        Show build time
      </Checkbox>
      <Checkbox
        checked={showBuildLabel}
        onToggle={(newValue) => dispatch(setShowBuildLabel(newValue))}
      >
        Show build label
      </Checkbox>
      <DropDown
        className={styles.dropDown}
        options={projectsToShowOptions}
        value={maxProjectsToShow}
        onChange={({ target }) =>
          dispatch(setMaxProjectsToShow(target.value as MaxProjectsToShow))
        }
      >
        <span className={styles.dropDownLabel}>Amount of project to show</span>
      </DropDown>
      <DropDown
        className={styles.dropDown}
        options={sortOptions}
        value={sort}
        onChange={({ target }) => dispatch(setSort(target.value as SortBy))}
      >
        <span className={styles.dropDownLabel}>Sort projects by</span>
      </DropDown>
      <DisplayPrognosisSelection />
    </Page>
  )
}

export const Component = DisplaySettingsPage
