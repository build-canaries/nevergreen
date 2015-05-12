var React = require('react/addons')

module.exports = {

    AddTray: React.createClass({
        mixins: [React.addons.LinkedStateMixin],

        propTypes: {
            addTray: React.PropTypes.func.isRequired
        },

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
                    <label htmlFor='cctray-url' className='tracking-cctray-group-cctray-form-label'>url</label>
                    <input id='cctray-url' className='tracking-cctray-group-cctray-form-input' type='text' placeholder='cctray url' valueLink={this.linkState('url')}/>
                    <button id='cctray-fetch' className='dashboard-button dashboard-button-secondary' onClick={this.onClick}>add</button>
                    <div>
                        <div id='authentication-group' className='tracking-cctray-group-authentication'>
                            <label htmlFor='username'>username</label>
                            <input id='username' className='tracking-cctray-group-cctray-form-input-authentication tracking-cctray-group-cctray-form-input' type='text' valueLink={this.linkState('username')}/>
                            <label htmlFor='password'>password</label>
                            <input id='password' className='tracking-cctray-group-cctray-form-input-authentication tracking-cctray-group-cctray-form-input' type='password' valueLink={this.linkState('password')}/>
                        </div>
                    </div>
                </div>
            )
        },

        onClick: function () {
            this.props.addTray(this.state)
        }
    })

}