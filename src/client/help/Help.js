import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import styles from './help.scss'
import ExternalLink from '../common/ExternalLink'

class Help extends Component {
  componentWillUnmount() {
    this.props.keyboardShortcut(false)
  }

  render() {
    return (
      <section className={styles.help}>
        <h2 className={styles.title}>Help</h2>

        <Container title='tracking' className={styles.container}>
          <span>To get started you need to enter the URL to your cctray xml file. Where it lives depends on your CI Server of choice:</span>
          <table className={styles.helpShortcutTable}>
            <thead>
            <tr>
              <th>CI Server</th>
              <th>Location</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Jenkins</td>
              <td className={styles.url}>http://jenkins.&lt;servername&gt;:8080/cc.xml</td>
            </tr>
            <tr>
              <td>Hudson</td>
              <td className={styles.url}>http://hudson.&lt;servername&gt;:8080/cc.xml</td>
            </tr>
            <tr>
              <td>Travis CI</td>
              <td className={styles.url}>http://travis-ci.org/&lt;ownername&gt;/&lt;repositoryname&gt;/cc.xml</td>
            </tr>
            <tr>
              <td>GO</td>
              <td className={styles.url}>http://&lt;servername&gt;:8154/go/cctray.xml</td>
            </tr>
            <tr>
              <td>CircleCI</td>
              <td className={styles.url}>https://circleci.com/cc.xml?circle-token=&lt;circle-token&gt;</td>
            </tr>
            <tr>
              <td>TeamCity</td>
              <td className={styles.url}>http://teamcity:8111/guestAuth/app/rest/cctray/projects.xml</td>
            </tr>
            <tr>
              <td>CruiseControl.rb</td>
              <td className={styles.url}>http://cc.rb.&lt;servername&gt;:3333/XmlStatusReport.aspx</td>
            </tr>
            <tr>
              <td>CruiseControl</td>
              <td className={styles.url}>http://cc.java.&lt;servername&gt;:8080/cctray.xml</td>
            </tr>
            <tr>
              <td>CruiseControl.NET</td>
              <td className={styles.url}>http://cc.net.&lt;servername&gt;/XmlStatusReport.aspx</td>
            </tr>
            <tr>
              <td>Solano CI</td>
              <td className={styles.url}>http://api.tddium.com/cc/&lt;long_uuid_string&gt;/cctray.xml</td>
            </tr>
            </tbody>
          </table>
          <p>If you are just checking us out then you can use the Apache projects cctray at:</p>
          <p className={styles.exampleTray}>https://builds.apache.org/cc.xml</p>
        </Container>

        <Container title='success' className={styles.container}>
          <span>You can add text or image URLs, these will get displayed when no projects are broken or building on the monitor page. Images are previewed in a 16:9 ratio which is how they would look on a full HD TV (1920x1080).</span>
          <p>Need some inspiration?</p>
          <p>Try searching for some <ExternalLink href='https://duckduckgo.com/?q=nature+1920x1080&iax=1&ia=images'>nice images</ExternalLink> or checkout <ExternalLink href='http://www.disapprovallook.com/'>ಠ_ಠ Disapproval Look</ExternalLink> for some fun messages, like jelly guy! ༼つ◕_◕༽つ</p>
        </Container>

        <Container title='Backup' className={styles.container}>
          <span>To export to GitHub you need to generate a <ExternalLink href='https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/'>personal access token</ExternalLink> to allow a non-anonymous gist to be created. Creating a non-anonymous gist will allow you to delete it viathe website later.</span>
          <p>The token <em>only</em> requires the <code>gist</code> <ExternalLink href='https://developer.github.com/v3/oauth/#scopes'>scope</ExternalLink>.</p>
          <p>Access tokens are not stored locally as they would allow editing of any of a users gists, so they need to be manually entered every time you want to export.</p>
          <p>Importing does not require an access token as even <ExternalLink href='https://help.github.com/articles/about-gists/#secret-gists'>secret gists are not actually private</ExternalLink>.</p>
        </Container>

        <Container title='keyboard shortcuts' className={styles.keyboardShortcuts} highlight={this.props.showShortcuts}>
          <span>The following keyboard shortcuts can be used to:</span>
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

        <Container title='additional links' className={styles.container}>
          <ul className={styles.helpLinks}>
            <li>
              <span className={styles.github}/> The full Nevergreen source is available on <ExternalLink href='https://github.com/build-canaries/nevergreen'>Github</ExternalLink>.
            </li>
            <li>
              <span className={styles.twitter}/> Follow Build Canaries on <ExternalLink href='https://twitter.com/BuildCanaries'>Twitter</ExternalLink> for news and updates.
            </li>
            <li>
              <span className={styles.icoMoon}/>Icons from <ExternalLink href='https://icomoon.io/'>IcoMoon</ExternalLink> &quot;custom built and crisp icon fonts, done right&quot;.
            </li>
          </ul>
        </Container>

        <Container title='licenses' className={styles.container}>
          <span>Nevergreen is open source under the <ExternalLink href='https://spdx.org/licenses/EPL-1.0'>Eclipse Public License 1.0 (EPL-1.0)</ExternalLink>.</span>
          <p>&quot;Pacman Death Sound&quot; by <ExternalLink href='http://www.orangefreesounds.com/pacman-death-sound/'>Alexander</ExternalLink> is licensed under <ExternalLink href='https://creativecommons.org/licenses/by-nc/4.0/legalcode'>CC BY 4.0</ExternalLink></p>
        </Container>
      </section>
    )
  }
}

Help.propTypes = {
  keyboardShortcut: PropTypes.func.isRequired,
  showShortcuts: PropTypes.bool
}

export default Help
