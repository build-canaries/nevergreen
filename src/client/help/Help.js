import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import styles from './help.scss'
import ExternalLink from '../common/ExternalLink'
import Title from '../common/Title'

class Help extends Component {
  componentWillUnmount() {
    this.props.keyboardShortcut(false)
  }

  render() {
    return (
      <Fragment>
        <Title>Help</Title>

        <Container title='Tracking' className={styles.container}>
          <p>You can find your CCTray XML at these locations for different CI servers</p>
          <table className={styles.helpShortcutTable}>
            <thead>
            <tr><th>CI Server</th><th>Location</th></tr>
            </thead>
            <tbody>
            <tr><td>Jenkins</td><td className={styles.url}>/cc.xml</td></tr>
            <tr><td>Hudson</td><td className={styles.url}>/cc.xml</td></tr>
            <tr><td>Travis CI</td><td className={styles.url}>/:ownername/:repositoryname/cc.xml</td></tr>
            <tr><td>GoCD</td><td className={styles.url}>/go/cctray.xml</td></tr>
            <tr><td>CircleCI</td><td className={styles.url}>/cc.xml?circle-token=:token</td></tr>
            <tr><td>TeamCity</td><td className={styles.url}>/guestAuth/app/rest/cctray/projects.xml</td></tr>
            <tr><td>CruiseControl.rb</td><td className={styles.url}>/XmlStatusReport.aspx</td></tr>
            <tr><td>CruiseControl</td><td className={styles.url}>/cctray.xml</td></tr>
            <tr><td>CruiseControl.NET</td><td className={styles.url}>/XmlStatusReport.aspx</td></tr>
            <tr><td>Solano CI</td><td className={styles.url}>/cc/:long_uuid_string/cctray.xml</td></tr>
            <tr><td>Semaphore CI</td><td className={styles.url}>/api/v1/projects/:hash_id/cc.xml?auth_token=:auth_token&ccmenu=cc.xml</td></tr>
            <tr><td>Buildkite</td><td className={styles.url}>/:organization-slug.xml?access_token=:token</td></tr>
            <tr><td>Drone</td><td className={styles.url}>/api/badges/:owner/:name/cc.xml</td></tr>
            <tr><td>Wercker</td><td className={styles.url}>/api/v2/applications/:project-id/cc/build</td></tr>
            </tbody>
          </table>
          <p>If you are just checking us out then you can use the Apache projects cctray at:</p>
          <p className={styles.exampleTray}>https://builds.apache.org/cc.xml</p>
        </Container>

        <Container title='Success' className={styles.container}>
          <p>You can add text or image URLs, these will get displayed when no projects are broken or building on the monitor page. Images are previewed in a 16:9 ratio which is how they would look on a full HD TV (1920x1080).</p>
          <p>Need some inspiration?</p>
          <p>Try searching for some <ExternalLink href='https://duckduckgo.com/?q=nature+1920x1080&iax=1&ia=images'>nice images</ExternalLink> or checkout <ExternalLink href='http://www.disapprovallook.com/'>Disapproval Look</ExternalLink> for some fun messages, like jelly guy! ༼&nbsp;つ◕_◕&nbsp;༽つ</p>
        </Container>

        <Container title='Backup' className={styles.container}>
          <p>To export to GitHub you need to <ExternalLink href='https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/'>generate a personal access token</ExternalLink> to allow a non-anonymous Gist to be created. Creating a non-anonymous Gist will allow you to delete it via the website later.</p>
          <p>The token <em>only</em> requires the <code>gist</code> <ExternalLink href='https://developer.github.com/v3/oauth/#scopes'>scope</ExternalLink>.</p>
          <p>Access tokens are not stored locally as they would allow editing of any of a users Gists, so they need to be manually entered every time you want to export.</p>
          <p>Importing does not require an access token as even <ExternalLink href='https://help.github.com/articles/about-gists/#secret-gists'>secret Gists are not actually private</ExternalLink>.</p>
        </Container>

        <Container title='Keyboard shortcuts' className={styles.keyboardShortcuts} highlight={this.props.showShortcuts}>
          <p>The following keyboard shortcuts can be used to:</p>
          <table className={styles.helpShortcutTable}>
            <thead>
            <tr>
              <th>Shortcut Key</th>
              <th>Definition</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><kbd className={styles.binding}>?</kbd></td>
              <td>Keyboard shortcuts</td>
              <td>Shows keyboard shortcuts (this section).</td>
            </tr>
            <tr>
              <td><kbd className={styles.binding}>esc</kbd></td>
              <td>Blur action</td>
              <td>Blur the currently focused input, allowing other shortcuts to be used again.</td>
            </tr>
            <tr>
              <td><kbd className={styles.binding}>m</kbd> or <kbd className={styles.binding}>1</kbd></td>
              <td>Go to Monitor</td>
              <td>Navigate to the monitor page.</td>
            </tr>
            <tr>
              <td><kbd className={styles.binding}>t</kbd> or <kbd className={styles.binding}>2</kbd></td>
              <td>Go to Tracking</td>
              <td>Navigate to the tracking page.</td>
            </tr>
            <tr>
              <td><kbd className={styles.binding}>s</kbd> or <kbd className={styles.binding}>3</kbd></td>
              <td>Go to Success</td>
              <td>Navigate to the success page.</td>
            </tr>
            <tr>
              <td><kbd className={styles.binding}>v</kbd> or <kbd className={styles.binding}>4</kbd></td>
              <td>Go to Settings</td>
              <td>Navigate to the settings page.</td>
            </tr>
            <tr>
              <td><kbd className={styles.binding}>b</kbd> or <kbd className={styles.binding}>5</kbd></td>
              <td>Go to Backup</td>
              <td>Navigate to the backup page.</td>
            </tr>
            <tr>
              <td><kbd className={styles.binding}>h</kbd> or <kbd className={styles.binding}>6</kbd></td>
              <td>Go to Help</td>
              <td>Navigate to this (the help) page.</td>
            </tr>
            <tr>
              <td><kbd className={styles.binding}>+</kbd><kbd className={styles.binding}>0..n</kbd> or <kbd className={styles.binding}>&#61;</kbd><kbd className={styles.binding}>0..n</kbd></td>
              <td>Include all</td>
              <td>Includes all projects for the tray with the given index (the first tray is at index 0).</td>
            </tr>
            <tr>
              <td><kbd className={styles.binding}>-</kbd><kbd className={styles.binding}>0..n</kbd></td>
              <td>Exclude all</td>
              <td>Excludes all projects for the tray with the given index (the first tray is at index 0).</td>
            </tr>
            <tr>
              <td><kbd className={styles.binding}>r</kbd><kbd className={styles.binding}>0..n</kbd></td>
              <td>Refresh tray</td>
              <td>Refresh the tray with the given index (the first tray is at index 0).</td>
            </tr>
            <tr>
              <td><kbd className={styles.binding}>p</kbd><kbd className={styles.binding}>0..n</kbd></td>
              <td>Toggle project view</td>
              <td>Toggle project and settings views for the tray with the given index (the first tray is at index 0).</td>
            </tr>
            <tr>
              <td><kbd className={styles.binding}>y</kbd><kbd className={styles.binding}>m</kbd><kbd className={styles.binding}>0..n</kbd></td>
              <td>Delete success message</td>
              <td>Deletes the message at the given index (the first message is at index 0).</td>
            </tr>
            <tr>
              <td><kbd className={styles.binding}>y</kbd><kbd className={styles.binding}>i</kbd><kbd className={styles.binding}>0..n</kbd></td>
              <td>Delete success image</td>
              <td>Deletes the image at the given index (the first image is at index 0).</td>
            </tr>
            </tbody>
          </table>
        </Container>

        <Container title='Additional links' className={styles.container}>
          <p className={styles.github}>The full Nevergreen source is available on <ExternalLink href='https://github.com/build-canaries/nevergreen'>Github</ExternalLink>.</p>
          <p className={styles.twitter}>Follow Build Canaries on <ExternalLink href='https://twitter.com/BuildCanaries'>Twitter</ExternalLink> for news and updates.</p>
        </Container>

        <Container title='Licenses' className={styles.container}>
          <p>Nevergreen is open source under the <ExternalLink href='https://spdx.org/licenses/EPL-1.0'>Eclipse Public License 1.0 (EPL-1.0)</ExternalLink> and uses <ExternalLink href='https://dependencyci.com/github/build-canaries/nevergreen'>open source software</ExternalLink>.</p>
          <p>Icons generated using the <ExternalLink href='https://icomoon.io/'>IcoMoon App</ExternalLink> and are licensed under <ExternalLink href='https://www.gnu.org/licenses/gpl.html'>GNU General Public License (GPL)</ExternalLink> / <ExternalLink href='https://creativecommons.org/licenses/by/4.0/'>Creative Commons Attribution 4.0 International (CC BY 4.0)</ExternalLink></p>
          <p><ExternalLink href='http://www.orangefreesounds.com/pacman-death-sound/'>&quot;Pacman Death Sound&quot; by Alexander</ExternalLink> is licensed under <ExternalLink href='https://creativecommons.org/licenses/by-nc/4.0/'>Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)</ExternalLink></p>
        </Container>
      </Fragment>
    )
  }
}

Help.propTypes = {
  keyboardShortcut: PropTypes.func.isRequired,
  showShortcuts: PropTypes.bool
}

export default Help
