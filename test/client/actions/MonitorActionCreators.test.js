import {INTERESTING_PROJECTS, INTERESTING_PROJECTS_FETCHING} from '../../../src/client/actions/Actions'
import {interestingProjects, interestingProjectsFetching} from '../../../src/client/actions/MonitorActionCreators'

describe('MonitorActionCreators', () => {

  describe(INTERESTING_PROJECTS_FETCHING, () => {

    test('should return the correct type', () => {
      const actual = interestingProjectsFetching()
      expect(actual).toHaveProperty('type', INTERESTING_PROJECTS_FETCHING)
    })

    test('should return the request given', () => {
      const actual = interestingProjectsFetching('some-request')
      expect(actual).toHaveProperty('request', 'some-request')
    })
  })

  describe(INTERESTING_PROJECTS, () => {

    test('should return the correct type', () => {
      const actual = interestingProjects([])
      expect(actual).toHaveProperty('type', INTERESTING_PROJECTS)
    })

    test('should return the projects given', () => {
      const actual = interestingProjects([{foo: 'bar', webUrl: ''}])
      expect(actual.projects.getIn(['0', 'foo'])).toEqual('bar')
    })
  })
})
