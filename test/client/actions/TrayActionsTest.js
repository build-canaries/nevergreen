import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {selectProject, SELECT_PROJECT} from '../../../src/client/actions/TrayActions'

describe('TrayActions', function () {

  describe('select project', function () {

    it('should return the correct type', function () {
      const actual = selectProject()
      expect(actual).to.have.property('type', SELECT_PROJECT)
    })

    it('should return the tray id', function () {
      const actual = selectProject('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the web url', function () {
      const actual = selectProject('irrelevant', 'some-project-url')
      expect(actual).to.have.property('projectId', 'some-project-url')
    })

    it('should return if the project was selected', function () {
      const actual = selectProject('irrelevant', 'irrelevant', true)
      expect(actual).to.have.property('selected', true)
    })
  })
})
