var React = require('react')

module.exports = {
    HelpSection: React.createClass({
        render: function () {
            return (
                <section className='dashboard-main-section'>
                    <h2 className='visually-hidden'>Help</h2>
                    <section className='help-section'>
                        <h3 className='help-title'>Monitor</h3>
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
                                        <td className='monitor-healthy-building help-monitor-example-light'>Yellow</td>
                                        <td>The project is currently building and was previously successful.</td>
                                    </tr>
                                    <tr>
                                        <td className='monitor-sick help-monitor-example-dark'>Red</td>
                                        <td>The project is broken!</td>
                                    </tr>
                                    <tr>
                                        <td className='monitor-sick-building help-monitor-example-dark'>Orange</td>
                                        <td>The project is currently building and was previously broken.</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="help-text">If nothing is broken or building then a random success message will be shown.</p>
                        </div>
                    </section>

                    <section className='help-section'>
                        <h3 className='help-title'>Tracking</h3>

                        <div className='help-contents'>
                            <p className="help-text">To get started you need to enter the URL to your cctray xml file. Where it lives depends on your CI Server of choice: </p>
                            <table className="help-tracking-table">
                                <thead>
                                    <tr>
                                        <th>CI Server</th>
                                        <th>Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Jenkins</td>
                                    <td>http://jenkins.&lt;servername&gt;:8080/cc.xml</td>
                                </tr>
                                <tr>
                                    <td>Hudson</td>
                                    <td>http://hudson.&lt;servername&gt;:8080/cc.xml</td>
                                </tr>
                                <tr>
                                    <td>Travis CI</td>
                                    <td>http://travis-ci.org/&lt;ownername&gt;/&lt;repositoryname&gt;/cc.xml</td>
                                </tr>
                                <tr>
                                    <td>GO</td>
                                    <td>http://&lt;servername&gt;:8154/go/cctray.xml</td>
                                </tr>
                                <tr>
                                    <td>Snap CI</td>
                                    <td>https://snap-ci.com/&lt;ownername&gt;/&lt;reponame&gt; /branch/master/cctray.xml</td>
                                </tr>
                                <tr>
                                    <td>CircleCI</td>
                                    <td>https://circleci.com/cc.xml?circle-token=&lt;circle-token&gt;</td>
                                </tr>
                                <tr>
                                    <td>TeamCity</td>
                                    <td>http://teamcity:8111/guestAuth/app/rest/cctray/projects.xml</td>
                                </tr>
                                <tr>
                                    <td>CruiseControl.rb</td>
                                    <td>http://cc.rb.&lt;servername&gt;:3333/XmlStatusReport.aspx</td>
                                </tr>
                                <tr>
                                    <td>CruiseControl</td>
                                    <td>http://cc.java.&lt;servername&gt;:8080/cctray.xml</td>
                                </tr>
                                <tr>
                                    <td>CruiseControl.NET</td>
                                    <td>http://cc.net.&lt;servername&gt;/XmlStatusReport.aspx</td>
                                </tr>
                                <tr>
                                    <td>Solano CI</td>
                                    <td>http://api.tddium.com/cc/&lt;long_uuid_string&gt;/cctray.xml</td>
                                </tr>
                                </tbody>
                            </table>
                            <p className="help-text">If you are just checking us out then you can use the Apache projects cctray at: https://builds.apache.org/cc.xml</p>
                        </div>
                    </section>

                    <section className='help-section'>
                        <h3 className='help-title'>Success</h3>
                        <div className='help-contents'>
                            <p className="help-text">You can add text or image urls, these will get displayed when no projects are broken or building on the monitor page. Images are previewed in a 16:9 ratio which is how they would look on a full HD TV (1920x1080).</p>
                            <p className="help-text">Need some inspiration?</p>
                            <p className="help-text">
                                Try searching for some <a href='https://duckduckgo.com/?q=nature+1920x1080&iax=1&ia=images' target='_blank'>nice images</a> or check out <a href='http://www.disapprovallook.com/' target='_blank'>ಠ_ಠ Disapproval Look</a> for some fun messages, like jelly guy! ༼つ◕_◕༽つ
                            </p>
                        </div>
                    </section>

                    <section role='seealso' className='help-section'>
                        <h3 className='help-title'>Additional Links</h3>
                        <ul className='help-links'>
                            <li>
                                <span className='help-link-icon icon-github4'></span>
                                The full Nevergreen source is available on <a href='https://github.com/build-canaries/nevergreen' target='_blank'>Github</a>.
                            </li>
                            <li>
                                <span className='help-link-icon  icon-twitter3'></span>
                                Follow Build Canaries on <a href='https://twitter.com/BuildCanaries' target='_blank'>Twitter</a> for news and updates.
                            </li>
                            <li>
                                <span className='help-link-icon  icon-IcoMoon'></span>
                                Fonts from <a href='https://icomoon.io/' target='_blank'>IcoMoon</a> "custom built and crisp icon fonts, done right".
                            </li>
                        </ul>
                    </section>
                </section>
            )
        }
    })
}