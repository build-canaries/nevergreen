import React from 'react'
import {shallow} from 'enzyme'
import {Externally} from '../../../../../src/client/backup/export/externally/Externally'
import {changeAndBlur, locator} from '../../../testHelpers'
import {BackupLocation} from '../../../../../src/client/actions/BackupActionCreators'
import {noop} from 'lodash'
import * as gateway from '../../../../../src/client/gateways/Gateway'
import * as backupGateway from '../../../../../src/client/gateways/BackupGateway'

describe('<Externally/>', () => {

  const DEFAULT_PROPS = {
    location: BackupLocation.GITHUB,
    backupSetId: noop,
    backupSetDescription: noop,
    backupSetUrl: noop,
    id: '',
    description: '',
    url: '',
    help: <div/>,
    configuration: ''
  }

  describe('exporting', () => {
    beforeEach(() => {
      jest.spyOn(backupGateway, 'exportConfiguration')
      jest.spyOn(gateway, 'send').mockResolvedValue({id: 'some-id'})
    })

    test('should export if an access token was entered', async () => {
      const props = {...DEFAULT_PROPS}

      const wrapper = shallow(<Externally {...props} />)
      changeAndBlur(wrapper.find(locator('access-token')), 'some-access-token')
      await wrapper.find(locator('export')).simulate('click')

      expect(gateway.send).toHaveBeenCalled()
    })

    test('should not try and export if no access token was entered', async () => {
      const props = {...DEFAULT_PROPS}

      const wrapper = shallow(<Externally {...props} />)
      await wrapper.find(locator('export')).simulate('click')

      expect(gateway.send).not.toHaveBeenCalled()
    })
  })
})
