import {expect} from 'chai'
import {describe, it} from 'mocha'
import {sickProjects} from '../../../src/client/domain/Tray'
import {PROGNOSIS_HEALTHY_BUILDING, PROGNOSIS_SICK, Project} from '../../../src/client/domain/Project'

describe('Tray', function () {

  describe('sickProjects', function () {

    it('should return only sick projects', function () {
      const healthyProject = new Project({prognosis: PROGNOSIS_HEALTHY_BUILDING})
      const sickProject = new Project({prognosis: PROGNOSIS_SICK})
      expect(sickProjects([healthyProject, sickProject])).to.deep.include(sickProject)
    })
  })
})
