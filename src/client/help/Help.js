import React, {Component} from 'react'
import Container from '../common/Container'
import './help.scss'

class Help extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <section className='help'>
        <h2 className='visually-hidden'>Help</h2>

        <Container title='Monitor'>
          <div className='help-contents'>
            <table className='help-tracking-table'>
              <thead>
              <tr>
                <th>Colour</th>
                <th>Meaning</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td className='healthy-building help-monitor-example-light'>Yellow</td>
                <td>The project is currently building and was previously successful.</td>
              </tr>
              <tr>
                <td className='sick help-monitor-example-dark'>Red</td>
                <td>The project is broken!</td>
              </tr>
              <tr>
                <td className='sick-building help-monitor-example-dark'>Orange</td>
                <td>The project is currently building and was previously broken.</td>
              </tr>
              </tbody>
            </table>
            <p className='help-text'>If nothing is broken or building then a random success message will be shown.</p>
          </div>
        </Container>

        <Container title='Tracking'>
          <div className='help-contents'>
            <p className='help-text'>To get started you need to enter the URL to your cctray xml file. Where it lives
              depends on your CI Server of choice: </p>
            <table className='help-tracking-table'>
              <thead>
              <tr>
                <th>CI Server</th>
                <th>Location</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Jenkins</td>
                <td className='url'>http://jenkins.&lt;servername&gt;:8080/cc.xml</td>
              </tr>
              <tr>
                <td>Hudson</td>
                <td className='url'>http://hudson.&lt;servername&gt;:8080/cc.xml</td>
              </tr>
              <tr>
                <td>Travis CI</td>
                <td className='url'>http://travis-ci.org/&lt;ownername&gt;/&lt;repositoryname&gt;/cc.xml</td>
              </tr>
              <tr>
                <td>GO</td>
                <td className='url'>http://&lt;servername&gt;:8154/go/cctray.xml</td>
              </tr>
              <tr>
                <td>Snap CI</td>
                <td className='url'>https://snap-ci.com/&lt;ownername&gt;/&lt;reponame&gt; /branch/master/cctray.xml</td>
              </tr>
              <tr>
                <td>CircleCI</td>
                <td className='url'>https://circleci.com/cc.xml?circle-token=&lt;circle-token&gt;</td>
              </tr>
              <tr>
                <td>TeamCity</td>
                <td className='url'>http://teamcity:8111/guestAuth/app/rest/cctray/projects.xml</td>
              </tr>
              <tr>
                <td>CruiseControl.rb</td>
                <td className='url'>http://cc.rb.&lt;servername&gt;:3333/XmlStatusReport.aspx</td>
              </tr>
              <tr>
                <td>CruiseControl</td>
                <td className='url'>http://cc.java.&lt;servername&gt;:8080/cctray.xml</td>
              </tr>
              <tr>
                <td>CruiseControl.NET</td>
                <td className='url'>http://cc.net.&lt;servername&gt;/XmlStatusReport.aspx</td>
              </tr>
              <tr>
                <td>Solano CI</td>
                <td className='url'>http://api.tddium.com/cc/&lt;long_uuid_string&gt;/cctray.xml</td>
              </tr>
              </tbody>
            </table>
            <p className="help-text">If you are just checking us out then you can use the Apache projects cctray at:
              https://builds.apache.org/cc.xml</p>
          </div>
        </Container>

        <Container title='Success'>
          <div className='help-contents'>
            <p className='help-text'>You can add text or image urls, these will get displayed when no projects are
              broken or building on the monitor page. Images are previewed in a 16:9 ratio which is how they would
              look on a full HD TV (1920x1080).</p>

            <p className='help-text'>Need some inspiration?</p>

            <p className='help-text'>
              Try searching for some <a href='https://duckduckgo.com/?q=nature+1920x1080&iax=1&ia=images'
                                        target='_blank'>nice images</a> or check out <a
              href='http://www.disapprovallook.com/' target='_blank'>ಠ_ಠ Disapproval Look</a> for some fun messages,
              like jelly guy! ༼つ◕_◕༽つ
            </p>
          </div>
        </Container>

        <Container title='Keyboard Shortcuts'>
          <div className='help-contents'>
            <p className='help-text'>The following keyboard shortcuts can be used to:</p>
            <table className='help-shortcut-table'>
              <thead>
              <tr>
                <th>Shortcut Key</th>
                <th>Definition</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><kbd className='binding'>?</kbd></td>
                <td>Keyboard shortcuts</td>
                <td>Shows keyboard shortcuts as tooltips hovering over the action they perform.</td>
              </tr>
              <tr>
                <td><kbd className='binding'>m</kbd> or <kbd className='binding'>1</kbd></td>
                <td>Go to Monitor</td>
                <td>Navigate to the monitor section.</td>
              </tr>
              <tr>
                <td><kbd className='binding'>t</kbd> or <kbd className='binding'>2</kbd></td>
                <td>Go to Tracking</td>
                <td>Navigate to the tracking section.</td>
              </tr>
              <tr>
                <td><kbd className='binding'>s</kbd> or <kbd className='binding'>3</kbd></td>
                <td>Go to Success</td>
                <td>Navigate to the success section.</td>
              </tr>
              <tr>
                <td><kbd className='binding'>v</kbd> or <kbd className='binding'>4</kbd></td>
                <td>Go to Audio/Visual</td>
                <td>Navigate to the audio/visual section.</td>
              </tr>
              <tr>
                <td><kbd className='binding'>b</kbd> or <kbd className='binding'>5</kbd></td>
                <td>Go to Backup</td>
                <td>Navigate to the backup section.</td>
              </tr>
              <tr>
                <td><kbd className='binding'>h</kbd> or <kbd className='binding'>6</kbd></td>
                <td>Go to Help</td>
                <td>Navigate to this (the help) section.</td>
              </tr>
              <tr>
                <td><kbd className='binding'>a</kbd></td>
                <td>Focus action</td>
                <td>Focus the primary action input e.g. the url input in the tracking section.</td>
              </tr>
              <tr>
                <td><kbd className='binding'>esc</kbd></td>
                <td>Blur action</td>
                <td>Blur the currently focused input, allowing other shortcuts to be used again.</td>
              </tr>
              <tr>
                <td><kbd className='binding'>+</kbd><kbd className='binding'>0..n</kbd> or <kbd
                  className='binding'>&#61;</kbd><kbd className='binding'>0..n</kbd></td>
                <td>Include all</td>
                <td>Includes all projects for the tray with the given index (the first tray is at index 0).</td>
              </tr>
              <tr>
                <td><kbd className='binding'>-</kbd><kbd className='binding'>0..n</kbd></td>
                <td>Exclude all</td>
                <td>Excludes all projects for the tray with the given index (the first tray is at index 0).</td>
              </tr>
              <tr>
                <td><kbd className='binding'>r</kbd><kbd className='binding'>0..n</kbd></td>
                <td>Refresh tray</td>
                <td>Refresh the tray with the given index (the first tray is at index 0).</td>
              </tr>
              <tr>
                <td><kbd className='binding'>p</kbd><kbd className='binding'>0..n</kbd></td>
                <td>Toggle project view</td>
                <td>Toggle project and settings views for the tray with the given index (the first tray is at index
                  0).
                </td>
              </tr>
              <tr>
                <td><kbd className='binding'>y</kbd><kbd className='binding'>m</kbd><kbd className='binding'>0..n</kbd>
                </td>
                <td>Delete success message</td>
                <td>Deletes the message at the given index (the first message is at index 0).</td>
              </tr>
              <tr>
                <td><kbd className='binding'>y</kbd><kbd className='binding'>i</kbd><kbd className='binding'>0..n</kbd>
                </td>
                <td>Delete success image</td>
                <td>Deletes the image at the given index (the first image is at index 0).</td>
              </tr>
              </tbody>
            </table>
          </div>
        </Container>

        <Container title='Additional Links'>
          <ul className='help-links'>
            <li>
              <span className='help-link-icon icon-github4'/>
              The full Nevergreen source is available on <a href='https://github.com/build-canaries/nevergreen'
                                                            target='_blank'>Github</a>.
            </li>
            <li>
              <span className='help-link-icon  icon-twitter3'/>
              Follow Build Canaries on <a href='https://twitter.com/BuildCanaries' target='_blank'>Twitter</a> for
              news and updates.
            </li>
            <li>
              <span className='help-link-icon  icon-IcoMoon'/>
              Icons from <a href='https://icomoon.io/' target='_blank'>IcoMoon</a> "custom built and crisp icon fonts,
              done right".
            </li>
          </ul>
        </Container>

        <Container title='Licenses'>
          <div className='help-contents'>
            <p className='help-text'>"Pacman Death Sound" by <a
              href='http://www.orangefreesounds.com/pacman-death-sound/' target='_blank'>Alexander</a> is licensed under
              <a href='https://creativecommons.org/licenses/by-nc/4.0/legalcode' target='_blank'>CC BY 4.0</a></p>
          </div>
        </Container>
      </section>
    )
  }
}

export default Help
