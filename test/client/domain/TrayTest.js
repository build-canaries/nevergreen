import {expect} from 'chai'
import {describe, it} from 'mocha'
import {extract, getErrors, removeErrors, removeJobs} from '../../../src/client/domain/Tray'

describe('Tray', function () {

  describe('getErrors', function () {

    it('should handle an empty list of projects', function () {
      const projects = []
      expect(getErrors(projects)).to.be.empty()
    })

    it('should return an empty list if no projects are in error', function () {
      const projects = [{}, {}, {}]
      expect(getErrors(projects)).to.be.empty()
    })

    it('should return the projects in error', function () {
      const projects = [{}, {isError: true}, {}]
      expect(getErrors(projects)).to.have.lengthOf(1)
    })
  })

  describe('removeErrors', function () {

    it('should handle an empty list of projects', function () {
      const projects = []
      expect(removeErrors(projects)).to.be.empty()
    })

    it('should return an empty list if all projects are in error', function () {
      const projects = [{isError: true}, {isError: true}, {isError: true}]
      expect(removeErrors(projects)).to.be.empty()
    })

    it('should return the projects not in error', function () {
      const projects = [{}, {isError: true}, {}]
      expect(removeErrors(projects)).to.have.lengthOf(2)
    })
  })

  describe('removeJobs', function () {

    it('should handle an empty list of projects', function () {
      const projects = []
      expect(removeJobs(projects)).to.be.empty()
    })

    it('should return an empty list if all projects are jobs', function () {
      const projects = [{job: '1'}, {job: '2'}, {job: '3'}]
      expect(removeJobs(projects)).to.be.empty()
    })

    it('should return the projects that are not jobs', function () {
      const projects = [{}, {job: '1'}, {}]
      expect(removeJobs(projects)).to.have.lengthOf(2)
    })
  })

  describe('extract', function () {

    it('should return the ok projects and error projects', function () {
      const okProject = {}
      const projectWithJob = {job: '1'}
      const projectWithError = {isError: true}
      const projects = [okProject, projectWithJob, projectWithError]

      expect(extract(projects)).to.deep.include({okProjects: [okProject], errorProjects: [projectWithError]})
    })
  })
})
