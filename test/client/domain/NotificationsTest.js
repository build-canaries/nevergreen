import {expect} from 'chai'
import {describe, it} from 'mocha'
import {withMockedImports} from '../TestUtils'
import {mocks} from '../Mocking'
import {PROGNOSIS_HEALTHY_BUILDING, PROGNOSIS_SICK} from '../../../src/client/domain/Project'

describe('Notifications', function () {

  const sendSystemNotification = mocks.spy()
  const {sickProjectsNotification, triggerSystemNotifications, noLongerSickProjectsNotification} = withMockedImports('client/domain/Notifications', {
    '../common/SystemNotifications': {sendSystemNotification}
  })

  describe('sickProjectsNotification', function () {

    it('should include number of projects in the title when multiple projects', function () {
      const notification = sickProjectsNotification(['a', 'b', 'c'])
      expect(notification).to.have.property('title', '3 projects are sick!')
    })

    it('should include all the project names in the notification body', function () {
      const notification = sickProjectsNotification(['a', 'b', 'c'])
      expect(notification).to.have.property('body', 'a, b, c')
    })

    it('should not include number of projects in the title when only one project', function () {
      const notification = sickProjectsNotification(['a'])
      expect(notification).to.have.property('title', 'project is sick!')
    })

    it('should correctly display one project in the notification body', function () {
      const notification = sickProjectsNotification(['a'])
      expect(notification).to.have.property('body', 'a')
    })
  })

  describe('noLongerSickProjectsNotification', function () {

    it('should include number of projects in the title when multiple projects', function () {
      const notification = noLongerSickProjectsNotification(['a', 'b', 'c'])
      expect(notification).to.have.property('title', '3 projects are no longer sick!')
    })

    it('should include all the project names in the notification body', function () {
      const notification = noLongerSickProjectsNotification(['a', 'b', 'c'])
      expect(notification).to.have.property('body', 'a, b, c')
    })

    it('should not include number of projects in the title when only one project', function () {
      const notification = noLongerSickProjectsNotification(['a'])
      expect(notification).to.have.property('title', 'project is no longer sick!')
    })

    it('should correctly display one project in the notification body', function () {
      const notification = noLongerSickProjectsNotification(['a'])
      expect(notification).to.have.property('body', 'a')
    })
  })

  describe('triggerSystemNotifications', function () {

    const projectName = 'some project'
    const someHealthyBuildingProject = {name: projectName, prognosis: PROGNOSIS_HEALTHY_BUILDING}
    const someSickProject = {name: projectName, prognosis: PROGNOSIS_SICK}

    it('should not send updates if nothing has changed', function () {
      triggerSystemNotifications([], [])
      expect(sendSystemNotification).to.not.have.been.called()
    })

    it('should send sick notification when project becomes sick', function () {
      triggerSystemNotifications([someHealthyBuildingProject], [someSickProject])
      expect(sendSystemNotification).to.have.been.calledWith({title: 'project is sick!', body: projectName})
    })

    it('should send not sick notification when project is no longer interesting', function () {
      triggerSystemNotifications([someSickProject], [someHealthyBuildingProject])
      expect(sendSystemNotification).to.have.been.calledWith({title: 'project is no longer sick!', body: projectName})
    })

    it('should not send sick notifications when project is still sick', function () {
      triggerSystemNotifications([someSickProject], [someSickProject])
      expect(sendSystemNotification).to.not.have.been.called()
    })
  })

})
