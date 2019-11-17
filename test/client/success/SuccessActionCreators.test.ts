import {addMessage, removeMessage} from '../../../src/client/success/SuccessActionCreators'
import {Actions} from '../../../src/client/Actions'

describe(Actions.MESSAGE_ADDED, () => {

  it('should return the correct type', () => {
    const actual = addMessage('irrelevant')
    expect(actual).toHaveProperty('type', Actions.MESSAGE_ADDED)
  })

  it('should return the text message to add', () => {
    const actual = addMessage('some-message')
    expect(actual).toHaveProperty('message', 'some-message')
  })

  it('should replace spaces with non-breaking spaces in emoticons so they don\'t get wrapped on the monitor page', () => {
    const actual = addMessage('(*＾3＾) /～♡')
    expect(actual).toHaveProperty('message', '(*＾3＾)\xa0/～♡')
  })

  it('should not replace spaces in sentences so they do get wrapped on the monitor page', () => {
    const actual = addMessage('nevergreen is awesome')
    expect(actual).toHaveProperty('message', 'nevergreen is awesome')
  })

  it('should return a no op action if message is blank', () => {
    const actual = addMessage('')
    expect(actual).toHaveProperty('type', Actions.NOOP)
  })
})

describe(Actions.MESSAGE_REMOVED, () => {

  it('should return the correct type', () => {
    const actual = removeMessage('irrelevant')
    expect(actual).toHaveProperty('type', Actions.MESSAGE_REMOVED)
  })

  it('should return the text message to add', () => {
    const actual = removeMessage('some-message')
    expect(actual).toHaveProperty('message', 'some-message')
  })
})
