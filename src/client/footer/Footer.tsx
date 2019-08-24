import React, {useState} from 'react'
import cn from 'classnames'
import version from '../../../resources/version.txt'
import versionMeta from '../../../resources/version_meta.txt'
import versionName from '../../../resources/version_name.txt'
import {SubmitAnIssue} from './SubmitAnIssue'
import {About} from './About'
import styles from './footer.scss'
import {useSelector} from 'react-redux'
import {getFullScreen} from '../NevergreenReducer'

export function Footer() {
  const fullScreen = useSelector(getFullScreen)
  const [showAbout, setShowAbout] = useState(false)

  const footerClassNames = cn(styles.siteFooter, {
    [styles.fullscreen]: fullScreen
  })
  const fullVersion = `${version}+${versionMeta}`
  const versionWithName = `v${fullVersion} ${versionName}`

  return (
    <>
      <About version={versionWithName}
             show={showAbout}
             close={() => setShowAbout(false)}/>
      <footer className={footerClassNames}>
        <button className={styles.about}
                onClick={() => setShowAbout(true)}
                type='button'>
          Nevergreen v{fullVersion} {versionName} by Build Canaries
        </button>
        <SubmitAnIssue version={versionWithName} className={styles.submitAnIssue}/>
      </footer>
    </>
  )
}
