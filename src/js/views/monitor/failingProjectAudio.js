const React = require('react')

module.exports = React.createClass({
  displayName: 'FailingProjectAudio',

  render() {
    let content = null

    if (this.props.brokenBuildSoundEnabled && this.props.hasFailingProjects) {
      content = (
        <audio autoPlay>
          <source src="/sounds/8-bit-confusion.wav" type="audio/wav"/>
        </audio>
      )
    }
    return content
  }
})
