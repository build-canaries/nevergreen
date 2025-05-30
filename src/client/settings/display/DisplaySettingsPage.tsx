import type { ReactElement } from 'react'
import { Checkbox } from '../../common/forms/Checkbox'
import { DropDown } from '../../common/forms/DropDown'
import {
  getMaxProjectsToShow,
  getShowBuildLabel,
  getShowBuildTime,
  getShowFeedIdentifier,
  getShowPrognosisName,
  getSort,
  MaxProjectsToShow,
  setMaxProjectsToShow,
  setShowBuildLabel,
  setShowBuildTime,
  setShowFeedIdentifier,
  setShowPrognosisName,
  setSort,
  SortBy,
} from './DisplaySettingsReducer'
import { LinkButton } from '../../common/LinkButton'
import { Page } from '../../common/Page'
import { Eye } from '../../common/icons/Eye'
import { Display } from '../../common/icons/Display'
import { RoutePaths } from '../../AppRoutes'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import styles from './display-settings-page.scss'
import { Link } from 'react-router'

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
  const showPrognosisLabel = useAppSelector(getShowPrognosisName)
  const maxProjectsToShow = useAppSelector(getMaxProjectsToShow)
  const sort = useAppSelector(getSort)

  return (
    <Page title="Display settings" icon={<Display />}>
      <LinkButton
        to={RoutePaths.preview}
        icon={<Eye />}
        className={styles.preview}
      >
        Preview display
      </LinkButton>
      <Checkbox
        checked={showFeedIdentifier}
        onToggle={(newValue) => dispatch(setShowFeedIdentifier(newValue))}
      >
        Show feed identifier
      </Checkbox>
      <Checkbox
        checked={showPrognosisLabel}
        onToggle={(newValue) => dispatch(setShowPrognosisName(newValue))}
      >
        Show prognosis name
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
        Amount of projects to show
      </DropDown>
      <DropDown
        className={styles.dropDown}
        options={sortOptions}
        value={sort}
        onChange={({ target }) => dispatch(setSort(target.value as SortBy))}
      >
        Sort projects by
      </DropDown>
      <p>
        Configure colours on the{' '}
        <Link to={RoutePaths.prognosis}>Prognosis settings page</Link>.
      </p>
    </Page>
  )
}

export const Component = DisplaySettingsPage
