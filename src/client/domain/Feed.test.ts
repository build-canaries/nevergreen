import {feedIdentifier} from './Feed'
import {buildFeed} from '../testHelpers'

describe('feedIdentifier', () => {

  it('should return Nevergreen for null because that means there was not a matching feed', () => {
    expect(feedIdentifier(null)).toEqual('Nevergreen')
  })

  it('should return Nevergreen for undefined because that means there was not a matching feed', () => {
    expect(feedIdentifier()).toEqual('Nevergreen')
  })

  it('should return the name by preference', () => {
    expect(feedIdentifier(buildFeed({name: 'some-name'}))).toEqual('some-name')
  })

  it('should return the URL if there is no name', () => {
    expect(feedIdentifier(buildFeed({name: '', url: 'some-url'}))).toEqual('some-url')
  })
})
