import React from 'react'
import {ExternalLink} from '../common/ExternalLink'
import styles from './tracking-help.scss'
import {URL} from '../common/URL'
import {PrimaryButton} from '../common/forms/Button'
import {AuthDetails, AuthTypes} from '../domain/Tray'

interface TrackingHelpProps {
  readonly addTray: (url: string, auth: AuthDetails) => void;
  readonly close?: () => void;
}

export function TrackingHelp({addTray, close}: TrackingHelpProps) {
  const addExampleTray = () => {
    addTray('https://builds.apache.org/cc.xml', {type: AuthTypes.none})
    close && close()
  }

  return (
    <>
      <h3 className={styles.title}>Adding</h3>
      <p>
        To start tracking your CI server set the <strong>URL</strong> to point at the CCTray XML feed. You can also
        add a <strong>username</strong> and <strong>password</strong> or an <strong>access token</strong> if your CI
        server is protected by auth.
      </p>
      <p>
        Multiple CI servers can be tracked, <ExternalLink
        href='https://www.thoughtworks.com/radar/techniques/a-single-ci-instance-for-all-teams'>allowing you to add
        other teams CI servers</ExternalLink>.
      </p>

      <h3 className={styles.title}>Projects</h3>
      <p>
        Once added you can choose which projects to include for tracking by selecting them.
      </p>
      <dl className={styles.settings}>
        <dt>refresh</dt>
        <dd>
          Fetches the latest list of projects from the CI server. If projects are added, removed or renamed on the
          CI server you will need to refresh to see them in Nevergreen.
        </dd>
        <dt>include all</dt>
        <dd>
          Includes all the currently shown (see filter) projects for tracking which means they will be shown on the
          Monitor page.
        </dd>
        <dt>exclude all</dt>
        <dd>
          Excludes all the currently shown (see filter) projects for tracking which means they will not be shown on
          the Monitor page.
        </dd>
        <dt>filter</dt>
        <dd>
          Takes a regular expression and filters the visible project list to any projects with matching names.
        </dd>
      </dl>

      <h3 className={styles.title}>Settings</h3>
      <p>
        Each CI server added has specific settings which can be changed via the <strong>settings</strong> tab.
      </p>
      <dl className={styles.settings}>
        <dt>name</dt>
        <dd>A friendly name of the CI server used in various places instead of the URL.</dd>
        <dt>URL</dt>
        <dd>The URL of the CI server.</dd>
        <dt>server type</dt>
        <dd>The server type can be set to enable some CI specific handling.</dd>
        <dt>username</dt>
        <dd>The username of the CI server, used in basic auth.</dd>
        <dt>password</dt>
        <dd>
          The encrypted password of the CI server, used in basic auth. The password requires explicitly saving as
          it needs to be encrypted as the plain text password is never saved locally.
        </dd>
        <dt>automatically include new projects</dt>
        <dd>
          When <em>enabled</em> (the default) any new projects added on the CI server will automatically be
          included for tracking. To remove a new project that has been automatically added, refreshing (see refresh) the
          CI server will make the project known to Nevergreen where it can be explicitly excluded by unchecking.
        </dd>
        <dt>delete</dt>
        <dd>Removes the CI server. Click with care as this can not be undone!</dd>
      </dl>

      <h3 className={styles.title}>CCTray XML feed locations</h3>
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
      <PrimaryButton onClick={addExampleTray}
                     data-locator='add-example-tray'>
        Try it now!
      </PrimaryButton>
    </>
  )
}
