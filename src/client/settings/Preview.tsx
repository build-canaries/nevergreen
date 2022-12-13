import type { ReactElement } from 'react'
import React, { useState } from 'react'
import type { FeedErrors } from '../domain/FeedError'
import { enrichErrors, toFeedApiError } from '../domain/FeedError'
import type { Projects } from '../domain/Project'
import { enrichProjects } from '../domain/Project'
import { InterestingProjects } from '../monitor/InterestingProjects'
import { Loading } from '../common/Loading'
import { useSelector } from 'react-redux'
import { getShowPrognosis, getSort } from './SettingsReducer'
import { post } from '../gateways/Gateway'
import { Banner } from '../Banner'
import { useNavigate } from 'react-router-dom'
import styles from './preview.scss'
import { useQuery } from '@tanstack/react-query'
import { ROUTE_DISPLAY } from '../AppRoutes'
import { createId } from '../common/Utils'

export function Preview(): ReactElement {
  const prognosis = useSelector(getShowPrognosis)
  const sort = useSelector(getSort)
  const navigate = useNavigate()

  const [projects, setProjects] = useState<Projects>([])
  const [feedErrors, setFeedErrors] = useState<FeedErrors>([])

  const { isLoading } = useQuery(
    ['preview'],
    async ({ signal }) => {
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
    {
      onSuccess: (response) => {
        setProjects((previouslyFetchedProjects) =>
          enrichProjects(response, previouslyFetchedProjects)
        )
        setFeedErrors((previousErrors) =>
          enrichErrors(response, previousErrors)
        )
      },
      onError: (e) => {
        setFeedErrors((previousErrors) =>
          enrichErrors([toFeedApiError(e)], previousErrors)
        )
      },
    }
  )

  return (
    <div className={styles.preview}>
      <Banner
        message="This is a preview showing your current display settings"
        hide={false}
        onDismiss={() => navigate(ROUTE_DISPLAY)}
      />
      <div className={styles.projects}>
        <div className={styles.projectsInner}>
          <Loading loaded={!isLoading} title="Preview" dark focus>
            <InterestingProjects projects={projects} feedErrors={feedErrors} />
          </Loading>
        </div>
      </div>
    </div>
  )
}
