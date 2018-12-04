import React, {Fragment} from 'react'
import {ExternalLink} from '../common/ExternalLink'
import PropTypes from 'prop-types'
import styles from './tracking-help.scss'
import {URL} from '../common/URL'

export function TrackingHelp({addTray, close}) {
  const addExampleTray = () => {
    addTray('https://builds.apache.org/cc.xml')
    close && close()
  }

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
          <td>Jenkins / Hudson</td>
          <td><URL url='/cc.xml'/></td>
        </tr>
        <tr>
          <td>Travis CI</td>
          <td><URL url='/:ownername/:repositoryname/cc.xml'/></td>
        </tr>
        <tr>
          <td>GoCD</td>
          <td><URL url='/go/cctray.xml'/></td>
        </tr>
        <tr>
          <td>CircleCI</td>
          <td><URL url='/cc.xml?circle-token=:token'/></td>
        </tr>
        <tr>
          <td>TeamCity</td>
          <td><URL url='/guestAuth/app/rest/cctray/projects.xml'/></td>
        </tr>
        <tr>
          <td>CruiseControl</td>
          <td><URL url='/cctray.xml'/></td>
        </tr>
        <tr>
          <td>CruiseControl.NET / CruiseControl.rb</td>
          <td><URL url='/XmlStatusReport.aspx'/></td>
        </tr>
        <tr>
          <td>Solano CI</td>
          <td><URL url='/cc/:long_uuid_string/cctray.xml'/></td>
        </tr>
        <tr>
          <td>Semaphore CI</td>
          <td><URL url='/api/v1/projects/:hash_id/cc.xml?auth_token=:auth_token&ccmenu=cc.xml'/></td>
        </tr>
        <tr>
          <td>Buildkite</td>
          <td><URL url='/:organization-slug.xml?access_token=:token'/></td>
        </tr>
        <tr>
          <td>Drone</td>
          <td><URL url='/api/badges/:owner/:name/cc.xml'/></td>
        </tr>
        <tr>
          <td>Wercker</td>
          <td><URL url='/api/v2/applications/:project-id/cc/build'/></td>
        </tr>
        </tbody>
      </table>
      <p>
        If you would like to try Nevergreen you can use the public Apache projects CCTray at:
      </p>
      <div className={styles.exampleUrl}>
        <URL url='https://builds.apache.org/cc.xml'/>
      </div>
      <button className={styles.addExampleTray}
              onClick={addExampleTray}
              data-locator='add-example-tray'>
        Try it now!
      </button>
    </Fragment>
  )
}

TrackingHelp.propTypes = {
  addTray: PropTypes.func.isRequired,
  close: PropTypes.func
}
