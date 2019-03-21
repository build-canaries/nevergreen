import {describe, it} from 'mocha'
import {expect} from 'chai'
import {INTERESTING_PROJECTS, INTERESTING_PROJECTS_FETCHING} from '../../../src/client/actions/Actions'
import {interestingProjects, interestingProjectsFetching} from '../../../src/client/actions/MonitorActionCreators'

describe('MonitorActionCreators', function () {

  describe(INTERESTING_PROJECTS_FETCHING, function () {

    it('should return the correct type', function () {
      const actual = interestingProjectsFetching()
      expect(actual).to.have.property('type', INTERESTING_PROJECTS_FETCHING)
    })

    it('should return the request given', function () {
      const actual = interestingProjectsFetching('some-request')
      expect(actual).to.have.property('request', 'some-request')
    })
  })

  describe(INTERESTING_PROJECTS, function () {

    it('should return the correct type', function () {
      const actual = interestingProjects([])
      expect(actual).to.have.property('type', INTERESTING_PROJECTS)
    })

    it('should return the projects given', function () {
      const actual = interestingProjects([{foo: 'bar', webUrl: ''}])
      expect(actual).to.have.property('projects').that.includes.nested.property('[0].foo', 'bar')
    })
  })
})
