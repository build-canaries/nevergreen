import {describe, it} from 'mocha'
import {expect} from 'chai'
import {INTERESTING_PROJECTS} from '../../../src/client/actions/Actions'
import {interestingProjects} from '../../../src/client/actions/MonitorActionCreators'

describe('MonitorActionCreators', function () {

  describe('interesting projects', function () {

    it('should return the correct type', function () {
      const actual = interestingProjects([])
      expect(actual).to.have.property('type', INTERESTING_PROJECTS)
    })

    it('should return the projects given', function () {
      const actual = interestingProjects([{foo: 'bar', webUrl: ''}])
      expect(actual).to.have.property('projects').that.includes.deep.property('[0].foo', 'bar')
    })
  })
})
