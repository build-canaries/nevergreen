import React, {ReactElement, useState} from 'react'
import {InterestingProjects} from '../monitor/InterestingProjects'
import {Loading} from '../common/Loading'
import {useSelector} from 'react-redux'
import {getShowPrognosis, getSort} from './SettingsReducer'
import {post, send} from '../gateways/Gateway'
import {enrichProjects, Projects, toProjectError} from '../domain/Project'
import {createFeed, createId} from '../domain/Feed'
import {Notification} from '../Notification'
import {useNavigate} from 'react-router-dom'
import styles from './preview.scss'
import {useQuery} from 'react-query'
import {routeDisplay} from '../AppRoutes'

export function Preview(): ReactElement {
  const prognosis = useSelector(getShowPrognosis)
  const sort = useSelector(getSort)
  const navigate = useNavigate()

  const [projects, setProjects] = useState<Projects>([])

  const {isLoading} = useQuery('preview', async ({signal}) => {
    const request = post<Projects>('/api/preview', {
      feeds: [createFeed(createId(), 'https://github.com/build-canaries/nevergreen')],
      sort,
      prognosis
    })
    return await send(request, signal)
  }, {
    onSuccess: ((response) => {
      setProjects((previouslyFetchedProjects) => enrichProjects(response, previouslyFetchedProjects))
    }),
    onError: (e) => {
      setProjects([toProjectError(e)])
    }
  })

  return (
    <div className={styles.preview}>
      <Notification notification='This is a preview showing your current display settings'
                    hide={false}
                    onDismiss={() => navigate(routeDisplay)}/>
      <div className={styles.projects}>
        <div className={styles.projectsInner}>
          <Loading loaded={!isLoading} dark>
            <InterestingProjects projects={projects}/>
          </Loading>
        </div>
      </div>
    </div>
  )
}
