import {sickProjects} from '../../../src/client/domain/Tray'
import {PROGNOSIS_HEALTHY_BUILDING, PROGNOSIS_SICK, Project} from '../../../src/client/domain/Project'

describe('Tray', () => {

  describe('sickProjects', () => {

    test('should return only sick projects', () => {
      const healthyProject = new Project({prognosis: PROGNOSIS_HEALTHY_BUILDING})
      const sickProject = new Project({prognosis: PROGNOSIS_SICK})
      expect(sickProjects([healthyProject, sickProject])).toEqual(expect.arrayContaining([sickProject]))
    })
  })
})
