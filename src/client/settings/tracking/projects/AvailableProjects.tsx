import type { Feed } from '../FeedsReducer'
import type { Projects } from '../../../domain/Project'
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import union from 'lodash/union'
import difference from 'lodash/difference'
import intersection from 'lodash/intersection'
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

function toProjectIds(projects: Projects): ReadonlyArray<string> {
  return projects.map((project) => project.projectId)
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

  useEffect(() => {
    if (projects) {
      setSelected((s) => intersection(s, toProjectIds(projects)))
    }
  }, [projects, setSelected])

  const filteredProjects = useMemo(() => {
    if (!isBlank(search) && projects) {
      return matchSorter(projects, search, { keys: ['description'] })
    }
    return projects ?? []
  }, [projects, search])

  const hasProjects = notEmpty(projects)
  const hasProjectsFiltered = notEmpty(filteredProjects)
  const searchDisabled = isFetching || !hasProjects || isError
  const includeExcludeDisabled = searchDisabled || !hasProjectsFiltered

  const controls = (
    <div className={styles.controls}>
      <fieldset className={styles.toggles}>
        <legend className={styles.legend}>Available projects</legend>
        <SecondaryButton
          className={styles.includeAll}
          onClick={() => {
            setSelected((s) => union(s, toProjectIds(filteredProjects)))
          }}
          icon={<CheckboxChecked />}
          disabled={includeExcludeDisabled}
        >
          Include all
        </SecondaryButton>
        <SecondaryButton
          className={styles.excludeAll}
          onClick={() => {
            setSelected((s) => difference(s, toProjectIds(filteredProjects)))
          }}
          icon={<CheckboxUnchecked />}
          disabled={includeExcludeDisabled}
        >
          Exclude all
        </SecondaryButton>
        <div className={styles.projectFilter}>
          <Input
            classNameContainer={styles.projectFilterInput}
            onChange={({ target }) => {
              setSearch(target.value)
            }}
            type="search"
            disabled={searchDisabled}
          >
            <span className={styles.search}>Search</span>
          </Input>
        </div>
      </fieldset>
    </div>
  )

  const buildItems = (
    <>
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
                    setSelected((s) => union(s, [project.projectId]))
                  } else {
                    setSelected((s) => difference(s, [project.projectId]))
                  }
                }}
              >
                {project.description}
              </Checkbox>
            </li>
          )
        })}
      </ol>
      <div className={styles.projectCount}>
        Showing {filteredProjects.length.toString()} of{' '}
        {projects?.length.toString() ?? '0'} projects (
        {selected.length.toString()} selected)
      </div>
    </>
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
        {!isError && !hasProjects && (
          <WarningMessages messages="No projects fetched, try refreshing" />
        )}
        {!isError && hasProjects && !hasProjectsFiltered && (
          <WarningMessages messages="No matching projects, update your search" />
        )}
        {!isError && hasProjectsFiltered && buildItems}
        {isError && <ErrorMessages messages={errorMessage(error)} />}
      </Loading>
    </section>
  )
}
