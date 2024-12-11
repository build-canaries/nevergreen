import type { Feed } from '../FeedsReducer'
import { Dispatch, ReactElement, SetStateAction } from 'react'
import { useMemo, useState } from 'react'
import { ErrorMessages, WarningMessages } from '../../../common/Messages'
import { Input } from '../../../common/forms/Input'
import { Refresh } from './Refresh'
import { errorMessage, isBlank, notEmpty } from '../../../common/Utils'
import { SecondaryButton } from '../../../common/forms/Button'
import { Loading } from '../../../common/Loading'
import { matchSorter } from 'match-sorter'
import { CheckboxChecked } from '../../../common/icons/CheckboxChecked'
import { CheckboxUnchecked } from '../../../common/icons/CheckboxUnchecked'
import { useProjects } from './ProjectsHook'
import { Checkbox } from '../../../common/forms/Checkbox'
import styles from './available-projects.scss'

interface AvailableProjectsProps {
  readonly feed: Feed
  readonly selected: ReadonlyArray<string>
  readonly setSelected: Dispatch<SetStateAction<ReadonlyArray<string>>>
}

export function AvailableProjects({
  feed,
  selected,
  setSelected,
}: AvailableProjectsProps): ReactElement {
  const [search, setSearch] = useState<string>('')

  const {
    isFetching,
    isError,
    error,
    refetch,
    data: projects,
  } = useProjects(feed)

  const filteredProjects = useMemo(() => {
    if (!isBlank(search) && projects) {
      return matchSorter(projects, search, { keys: ['description'] })
    }
    return projects || []
  }, [projects, search])

  const hasProjects = notEmpty(projects)
  const hasProjectsFiltered = notEmpty(filteredProjects)
  const controlsDisabled = isFetching || !hasProjects || isError

  const includeAll = () => {
    setSelected((s) =>
      s.concat(filteredProjects.map((project) => project.projectId)),
    )
  }

  const excludeAll = () => {
    const excludeIds = filteredProjects.map((project) => project.projectId)
    setSelected((s) => s.filter((id) => !excludeIds.includes(id)))
  }

  const controls = (
    <div className={styles.controls}>
      <fieldset className={styles.toggles}>
        <legend className={styles.legend}>Available projects</legend>
        <SecondaryButton
          className={styles.includeAll}
          onClick={includeAll}
          icon={<CheckboxChecked />}
          disabled={controlsDisabled}
        >
          Include all
        </SecondaryButton>
        <SecondaryButton
          className={styles.excludeAll}
          onClick={excludeAll}
          icon={<CheckboxUnchecked />}
          disabled={controlsDisabled}
        >
          Exclude all
        </SecondaryButton>
        <div className={styles.projectFilter}>
          <Input
            classNameContainer={styles.projectFilterInput}
            onChange={({ target }) => setSearch(target.value)}
            type="search"
            disabled={controlsDisabled}
          >
            <span className={styles.search}>Search</span>
          </Input>
        </div>
      </fieldset>
    </div>
  )

  const buildItems = (
    <ol className={styles.buildItems} data-locator="available-projects-list">
      {filteredProjects.map((project) => {
        const isSelected = selected.includes(project.projectId)

        return (
          <li key={project.projectId}>
            <Checkbox
              className={styles.projectCheckbox}
              checked={isSelected}
              onToggle={(val) => {
                if (val) {
                  setSelected((s) => s.concat(project.projectId))
                } else {
                  setSelected((s) => s.filter((id) => id !== project.projectId))
                }
              }}
            >
              {project.description}
            </Checkbox>
          </li>
        )
      })}
    </ol>
  )

  const noProjectsWarning = (
    <WarningMessages messages="No projects fetched, please refresh" />
  )

  const noProjectsMatchSearchWarning = (
    <WarningMessages messages="No matching projects, please update your search" />
  )

  return (
    <section className={styles.availableProjects}>
      <Refresh refreshTray={() => void refetch()} isLoading={isFetching} />
      {controls}
      <Loading
        isLoading={isFetching}
        className={styles.loading}
        title="Projects"
      >
        {!isError && !hasProjects && noProjectsWarning}
        {!isError &&
          hasProjects &&
          !hasProjectsFiltered &&
          noProjectsMatchSearchWarning}
        {!isError && hasProjectsFiltered && buildItems}
        {isError && <ErrorMessages messages={errorMessage(error)} />}
      </Loading>
    </section>
  )
}
