var React = require('react/addons')
var $ = require('jquery')
var trays = require('../../services/trays')
var security = require('../../services/security')
var projectsService = require('../../services/projects')
var loading = require('../general/loading')
var repo = require('../../storage/repository')
var trackingRepository = require('../../storage/trackingRepository')(repo)

var HelloText = React.createClass({
    render: function () {
        return (
            <fieldset id='hello-text' className='tracking-cctray-group-instructions'>
                <p className='tracking-cctray-group-instructions-text'>Howdy stranger!</p>
                <p className='tracking-cctray-group-instructions-text'>I'm going to need to know the URL to your cctray xml file to get started. Where it lives depends on your CI Server of choice: </p>

                <table className='tracking-cctray-group-instructions-table'>
                    <tr>
                        <th>CI Server</th>
                        <th>Location</th>
                    </tr>
                    <tr>
                        <td>Jenkins</td>
                        <td>{'http://jenkins.servername:8080/cc.xml'}</td>
                    </tr>
                    <tr>
                        <td>Hudson</td>
                        <td>{'http://hudson.servername:8080/cc.xml'}</td>
                    </tr>
                    <tr>
                        <td>Travis CI</td>
                        <td>{'http://travis-ci.org/ownername/repositoryname/cc.xml'} </td>
                    </tr>
                    <tr>
                        <td>GO</td>
                        <td>{'http://servername:8154/go/cctray.xml'} </td>
                    </tr>
                    <tr>
                        <td>Snap CI</td>
                        <td>{'https://snap-ci.com/ownername/reponame/branch/master/cctray.xml'} </td>
                    </tr>
                    <tr>
                        <td>CircleCI</td>
                        <td>{'https://circleci.com/cc.xml?circle-token=:circle-token'}</td>
                    </tr>
                    <tr>
                        <td>TeamCity</td>
                        <td>{'http://teamcity:8111/guestAuth/app/rest/cctray/projects.xml'}</td>
                    </tr>
                    <tr>
                        <td>CruiseControl.rb</td>
                        <td>{'http://cc.rb.servername:3333/XmlStatusReport.aspx'}</td>
                    </tr>
                    <tr>
                        <td>CruiseControl</td>
                        <td>{'http://cc.java.servername:8080/cctray.xml'}</td>
                    </tr>
                    <tr>
                        <td>CruiseControl.NET</td>
                        <td>{'http://cc.net.servername/XmlStatusReport.aspx'}</td>
                    </tr>
                    <tr>
                        <td>Solano CI</td>
                        <td>{'http://api.tddium.com/cc/long_uuid_string/cctray.xml'}</td>
                    </tr>
                </table>

                <p className='tracking-cctray-group-instructions-text'>If you are just checking us out then you can use the Apache projects cctray at: {'https://builds.apache.org/cc.xml'}</p>
            </fieldset>
        )
    }
})

var TrayAuth = React.createClass({
    render: function () {
        return (
            <div>
                <div id='authentication-group' className='tracking-cctray-group-authentication'>
                    <label htmlFor='username'>Username</label>
                    <input id='username' className='tracking-cctray-group-cctray-form-input-authentication tracking-cctray-group-cctray-form-input' type='text' onChange={this.props.updateUsername} />
                    <label htmlFor='password'>Password</label>
                    <input id='password' className='tracking-cctray-group-cctray-form-input-authentication tracking-cctray-group-cctray-form-input' type='password' onChange={this.props.updatePassword} />
                </div>
            </div>
        )
    }
})

var AddTray = React.createClass({
    getInitialState: function () {
        return {
            url: '',
            username: '',
            password: ''
        }
    },

    render: function () {
        return (
            <div className='tracking-cctray-group-cctray-form'>
                <label htmlFor='cctray-url' className='tracking-cctray-group-cctray-form-label'>Url</label>
                <input id='cctray-url' className='tracking-cctray-group-cctray-form-input' type='text' placeholder='cctray url' onChange={this.updateUrl}/>
                <button id='cctray-fetch' className='tracking-cctray-group-cctray-form-button dashboard-button dashboard-button-secondary' onClick={this.onClick}>Fetch</button>
                <br/>
                <TrayAuth updateUsername={this.updateUsername} updatePassword={this.updatePassword} />
            </div>
        )
    },

    updateUrl: function (event) {
        this.setState({url: event.target.value})
    },

    updateUsername: function (event) {
        this.setState({username: event.target.value})
    },

    updatePassword: function (event) {
        this.setState({password: event.target.value})
    },

    onClick: function () {
        this.props.addTray(this.state)
    }
})

var AvailableProject = React.createClass({
    render: function () {
        return (
            <p className='tracking-cctray-group-build-item'>
                <label className='label-checkbox'>
                    <input className='checkbox no-text-selection' type='checkbox' title='' checked={this.props.included} onChange={this.onChange} disabled={this.props.removed}></input>
                    <span className={this.props.removed ? 'config-removed-project' : ''}>{this.props.name}</span>
                    {this.props.isNew ? <sup className='config-new-project'> new</sup> : ''}
                    {this.props.removed ? <sup className='config-removed-info'> removed</sup> : ''}
                </label>
            </p>
        )
    },

    onChange: function (event) {
        this.props.selectProject(event.target.checked)
    }
})

var Tray = React.createClass({
    getInitialState: function () {
        return {
            loaded: false,
            tray: this.props.tray
        }
    },

    render: function () {
        if (!this.state.loaded) {
            return loading.Spinner()
        } else {
            return (
                <fieldset id='projects-controls' className='tracking-cctray-group-builds'>
                    <legend className='tracking-cctray-group-builds-legend'>Available builds</legend>
                    <div className='tracking-cctray-group-build-toggles'>
                        <button id='include-all' className='dashboard-button dashboard-button-small dashboard-button-white' onClick={this.includeAll}>Include all</button>
                        <button id='exclude-all' className='dashboard-button dashboard-button-small dashboard-button-white' onClick={this.excludeAll}>Exclude all</button>
                    </div>
                    <div id='projects' className='tracking-cctray-group-build-items'>
                    {
                        this.state.tray.projects().map(function (project) {
                            return <AvailableProject key={project.name} name={project.name} included={project.included} isNew={project.isNew} removed={project.wasRemoved} selectProject={this.selectProject.bind(this, project.name)} />
                        }.bind(this))
                        }
                    </div>
                </fieldset>
            )
        }
    },

    componentDidMount: function () {
        projectsService.fetchAll(this.state.tray, this.projectsLoaded)
    },

    projectsLoaded: function (data) {
        if (this.isMounted()) {
            var retrievedProjectNames = data.projects.map(function (project) {
                return project.name
            })
            var updatedTray = React.addons.update(this.state.tray, {
                retrievedProjects: {$set: retrievedProjectNames}
            })
            this.setState({
                loaded: true,
                tray: updatedTray
            })
        }
    },

    selectProject: function (name, included) {
        var command
        if (included) {
            command = {$push: [name]}
        } else {
            command = {$splice: [[this.state.tray.includedProjects.indexOf(name), 1]]}
        }

        var updatedTray = React.addons.update(this.state.tray, {
            includedProjects: command
        })
        this.setState({tray: updatedTray})
    },

    includeAll: function () {
        var updatedTray = React.addons.update(this.state.tray, {
            includedProjects: {$set: this.state.tray.retrievedProjects}
        })
        this.setState({tray: updatedTray})
    },

    excludeAll: function () {
        var updatedTray = React.addons.update(this.state.tray, {
            includedProjects: {$set: []}
        })
        this.setState({tray: updatedTray})
    },

    componentWillUpdate: function (nextProps, nextState) {
        trackingRepository.saveTray(nextState.tray)
    }
})

var TrackingSection = React.createClass({
    getInitialState: function () {
        return {trays: this.props.trays}
    },

    render: function () {
        return (
            <section id='tracking' className='dashboard-main-section active'>
                <h2 className='visuallyhidden'>Tracking</h2>

                <fieldset className='tracking-cctray-group'>
                    <AddTray addTray={this.addTray} />
                    {
                        this.state.trays.map(function (tray) {
                            return <Tray key={tray.url} tray={tray} />
                        }.bind(this))
                        }
                </fieldset>
            </section>
        )
    },

    addTray: function (tray) {
        if (trays.hasAuth(tray)) {
            security.encryptPassword(tray.password, function (data) {
                var newTrays = React.addons.update(this.state.trays, {
                    $set: [trays.newTray(tray.url, tray.username, data.password)]
                })
                this.setState({trays: newTrays})
            }.bind(this))
        } else {
            var newTrays = React.addons.update(this.state.trays, {
                $set: [trays.newTray(tray.url)]
            })
            this.setState({trays: newTrays})
        }
    }
})


module.exports = {
    render: function (trays) {
        React.render(<TrackingSection trays={trays} />, $('#tracking-content')[0])
    }
}
