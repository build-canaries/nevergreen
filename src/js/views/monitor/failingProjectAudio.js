const React = require('react')
const DisplayStore = require('../../stores/DisplayStore')

module.exports = React.createClass({
  displayName: 'FailingProjectAudio',

  render() {
    let content = null
    if (DisplayStore.areBrokenBuildSoundsEnabled()) {
      content = (
        <audio autoPlay>
          <source src="/sounds/8-bit-confusion.wav" type="audio/wav"/>
        </audio>
      )
    }
    return content
  }
})
