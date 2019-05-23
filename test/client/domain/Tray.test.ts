import {sickProjects} from '../../../src/client/domain/Tray'
import {Prognosis} from '../../../src/client/domain/Project'
import {buildProject} from '../testHelpers'

describe('Tray', () => {

  describe('sickProjects', () => {

    test('should return only sick projects', () => {
      const healthyProject = buildProject({prognosis: Prognosis.healthyBuilding})
      const sickProject = buildProject({prognosis: Prognosis.sick})
      expect(sickProjects([healthyProject, sickProject])).toEqual([sickProject])
    })
  })
})
