import {Actions} from '../../../src/client/Actions'
import {interestingProjects, interestingProjectsFetching} from '../../../src/client/monitor/MonitorActionCreators'
import {fakeRequest} from '../../../src/client/gateways/Gateway'
import {buildProject} from '../testHelpers'

describe('MonitorActionCreators', () => {

  describe(Actions.INTERESTING_PROJECTS_FETCHING, () => {

    test('should return the correct type', () => {
      const actual = interestingProjectsFetching(fakeRequest('irrelevant'))
      expect(actual).toHaveProperty('type', Actions.INTERESTING_PROJECTS_FETCHING)
    })

    test('should return the request given', () => {
      const request = fakeRequest('irrelevant')
      const actual = interestingProjectsFetching(request)
      expect(actual).toHaveProperty('request', request)
    })
  })

  describe(Actions.INTERESTING_PROJECTS, () => {

    test('should return the correct type', () => {
      const actual = interestingProjects([], [])
      expect(actual).toHaveProperty('type', Actions.INTERESTING_PROJECTS)
    })

    test('should return the projects given', () => {
      const project = buildProject()
      const actual = interestingProjects([project], [])
      expect(actual.projects).toEqual([project])
    })
  })
})
