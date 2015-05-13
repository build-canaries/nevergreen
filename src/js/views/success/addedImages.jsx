var React = require('react/addons')
var Image = require('./image').Image

module.exports = {
    AddedImages: React.createClass({
        propTypes: {
            messages: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
            removeMessage: React.PropTypes.func.isRequired
        },

        render: function () {
            return (
                <section className='success-section'>
                    <h3 className='success-title'>Images</h3>
                    <ul className='success-list success-images-list'>
                        {
                            this.props.messages.map(function (message) {
                                return <Image key={message.index} url={message.value} removeMessage={this.props.removeMessage.bind(null, message.index)}/>
                            }.bind(this))
                        }
                    </ul>
                </section>
            )
        }
    })
}