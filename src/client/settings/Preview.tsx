import React, {ReactElement, useEffect, useState} from 'react'
import {InterestingProjects} from '../monitor/InterestingProjects'
import {Loading} from '../common/Loading'
import {useSelector} from 'react-redux'
import {getShowPrognosis, getSort} from './SettingsReducer'
import {isAbortedRequest, post, send} from '../gateways/Gateway'
import {enrichProjects, Projects, toProjectError} from '../domain/Project'
import {createId, createTray} from '../domain/Tray'
import {Notification} from '../Notification'
import {useHistory} from 'react-router-dom'
import styles from './preview.scss'
import {ROUTE_SETTINGS_DISPLAY} from '../Routes'

export function Preview(): ReactElement {
  const prognosis = useSelector(getShowPrognosis)
  const sort = useSelector(getSort)
  const history = useHistory()

  const [loaded, setLoaded] = useState(false)
  const [projects, setProjects] = useState<Projects>([])

  useEffect(() => {
    const request = post('/api/preview', {
      feeds: [createTray(createId(), 'https://github.com/build-canaries/nevergreen')],
      sort,
      prognosis
    })

    const getProjects = async () => {
      try {
        const response = await send<Projects>(request)
        setProjects((previouslyFetchedProjects) => enrichProjects(response, previouslyFetchedProjects))
        setLoaded(true)
      } catch (e) {
        if (!isAbortedRequest(e)) {
          setProjects([toProjectError(e)])
          setLoaded(true)
        }
      }
    }

    void getProjects()

    return () => {
      request.abort.bind(request)
    }
  }, [prognosis, sort])

  return (
    <div className={styles.preview}>
      <Notification notification='This is a preview showing your current display settings'
                    hide={false}
                    dismiss={() => history.push(ROUTE_SETTINGS_DISPLAY)}/>
      <div className={styles.projects}>
        <div className={styles.projectsInner}>
          <Loading loaded={loaded} dark>
            <InterestingProjects projects={projects}/>
          </Loading>
        </div>
      </div>
    </div>
  )
}
