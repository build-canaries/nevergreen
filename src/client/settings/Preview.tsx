import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import type { FeedErrors } from '../domain/FeedError'
import { enrichErrors, toFeedApiError } from '../domain/FeedError'
import type { Projects } from '../domain/Project'
import { enrichProjects } from '../domain/Project'
import { InterestingProjects } from '../monitor/InterestingProjects'
import { Loading } from '../common/Loading'
import { getShowPrognosis, getSort } from './display/DisplaySettingsReducer'
import { post } from '../gateways/Gateway'
import { Banner } from '../Banner'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { RoutePaths } from '../AppRoutes'
import { createId } from '../common/Utils'
import { useAppSelector } from '../configuration/Hooks'
import styles from './preview.scss'
import { Title } from '../common/Title'

export function Preview(): ReactElement {
  const prognosis = useAppSelector(getShowPrognosis)
  const sort = useAppSelector(getSort)
  const navigate = useNavigate()

  const [projects, setProjects] = useState<Projects>([])
  const [feedErrors, setFeedErrors] = useState<FeedErrors>([])

  const { isLoading, data, error } = useQuery({
    queryKey: ['preview'],
    queryFn: async ({ signal }) => {
      return post<Projects>({
        url: '/api/preview',
        data: {
          feeds: [
            {
              trayId: createId(),
              url: 'https://github.com/build-canaries/nevergreen',
            },
          ],
          sort,
          prognosis,
        },
        signal,
      })
    },
  })

  useEffect(() => {
    if (data) {
      setProjects((previouslyFetchedProjects) =>
        enrichProjects(data, previouslyFetchedProjects),
      )
      setFeedErrors((previousErrors) => enrichErrors(data, previousErrors))
    }
  }, [data])

  useEffect(() => {
    if (error) {
      setFeedErrors((previousErrors) =>
        enrichErrors([toFeedApiError(error)], previousErrors),
      )
    }
  }, [error])

  return (
    <div className={styles.preview}>
      <Title focus={false}>Preview</Title>
      <Banner
        message="This is a preview showing your current display settings"
        hide={false}
        onDismiss={() => navigate(RoutePaths.display)}
      />
      <div className={styles.projects}>
        <div className={styles.projectsInner}>
          <Loading isLoading={isLoading} title="Preview" dark focus>
            <InterestingProjects projects={projects} feedErrors={feedErrors} />
          </Loading>
        </div>
      </div>
    </div>
  )
}

export const Component = Preview
