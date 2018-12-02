import React, {Fragment} from 'react'
import {ExternalLink} from '../common/ExternalLink'
import PropTypes from 'prop-types'
import styles from './tracking-help.scss'

export function TrackingHelp({addTray}) {
  return (
    <Fragment>
      <p>
        To start tracking your CI server set the <strong>URL</strong> to point at the CCTray XML feed. You can also
        add a <strong>username</strong> and <strong>password</strong> if your CI server is protected by basic auth.
      </p>
      <p>
        Multiple CI servers can be tracked, <ExternalLink
        href='https://www.thoughtworks.com/radar/techniques/a-single-ci-instance-for-all-teams'>allowing you to add
        other teams CI servers</ExternalLink>.
      </p>
      <p>
        You can find your CCTray XML feed at these locations:
      </p>
      <table>
        <thead>
        <tr>
          <th>CI Server</th>
          <th>Location</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Jenkins</td>
          <td><code>/cc.xml</code></td>
        </tr>
        <tr>
          <td>Travis CI</td>
          <td><code>/:ownername/:repositoryname/cc.xml</code></td>
        </tr>
        <tr>
          <td>GoCD</td>
          <td><code>/go/cctray.xml</code></td>
        </tr>
        <tr>
          <td>CircleCI</td>
          <td><code>/cc.xml?circle-token=:token</code></td>
        </tr>
        <tr>
          <td>TeamCity</td>
          <td><code>/guestAuth/app/rest/cctray/projects.xml</code></td>
        </tr>
        <tr>
          <td>Hudson</td>
          <td><code>/cc.xml</code></td>
        </tr>
        <tr>
          <td>CruiseControl.rb</td>
          <td><code>/XmlStatusReport.aspx</code></td>
        </tr>
        <tr>
          <td>CruiseControl</td>
          <td><code>/cctray.xml</code></td>
        </tr>
        <tr>
          <td>CruiseControl.NET</td>
          <td><code>/XmlStatusReport.aspx</code></td>
        </tr>
        <tr>
          <td>Solano CI</td>
          <td><code>/cc/:long_uuid_string/cctray.xml</code></td>
        </tr>
        <tr>
          <td>Semaphore CI</td>
          <td><code>/api/v1/projects/:hash_id/cc.xml?auth_token=:auth_token&ccmenu=cc.xml</code></td>
        </tr>
        <tr>
          <td>Buildkite</td>
          <td><code>/:organization-slug.xml?access_token=:token</code></td>
        </tr>
        <tr>
          <td>Drone</td>
          <td><code>/api/badges/:owner/:name/cc.xml</code></td>
        </tr>
        <tr>
          <td>Wercker</td>
          <td><code>/api/v2/applications/:project-id/cc/build</code></td>
        </tr>
        </tbody>
      </table>
      <p>
        If you would like to try Nevergreen you can use the public Apache projects CCTray at:
      </p>
      <div className={styles.exampleUrl}>
        <code>https:
          <wbr/>
          &#x2F;/builds
          <wbr/>
          .apache
          <wbr/>
          .org
          <wbr/>
          /cc.xml</code>
      </div>
      <button className={styles.addExampleTray}
              onClick={() => addTray('http://localhost:5050/cc.xml')}
              data-locator='add-example-tray'>
        Try it now!
      </button>
    </Fragment>
  )
}

TrackingHelp.propTypes = {
  addTray: PropTypes.func.isRequired
}
