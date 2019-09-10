import React, {ReactNode} from 'react'
import {TraySettings} from '../../../../src/client/tracking/settings/TraySettings'
import {buildTray, render, setupReactModal} from '../../testHelpers'
import {
  getTray,
  getTrayAuthType,
  getTrayIncludeNew,
  getTrayName,
  getTrayPassword,
  getTrayServerType,
  getTrayUrl,
  getTrayUsername,
  TRAYS_ROOT
} from '../../../../src/client/tracking/TraysReducer'
import userEvent from '@testing-library/user-event'
import {wait} from '@testing-library/react'
import {AuthTypes} from '../../../../src/client/domain/Tray'
import * as SecurityGateway from '../../../../src/client/gateways/SecurityGateway'
import {fakeRequest} from '../../../../src/client/gateways/Gateway'
import {useSelector} from 'react-redux'

const FakePage = ({trayId, children}: { trayId: string; children: ReactNode }) => {
  const tray = useSelector(getTray(trayId))
  return (
    <div>
      {tray && children}
    </div>
  )
}

describe('<TraySettings/>', () => {

  const DEFAULT_PROPS = {
    trayId: 'trayId'
  }

  beforeEach(setupReactModal)

  it('should set the tray name on blur', async () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: buildTray({
          name: 'some-name'
        })
      }
    }
    const {getByTestId, store} = render(<TraySettings {...DEFAULT_PROPS} />, state)
    userEvent.click(getByTestId('tray-name'))
    await userEvent.type(getByTestId('tray-name'), 'some-new-name')
    getByTestId('tray-name').blur()
    expect(getTrayName('trayId')(store.getState())).toEqual('some-new-name')
  })

  it('should generate a new random name', () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: buildTray({
          name: 'some-name'
        })
      }
    }
    const {getByTestId, store} = render(<TraySettings {...DEFAULT_PROPS} />, state)
    userEvent.click(getByTestId('generate-random'))
    expect(getTrayName('trayId')(store.getState())).not.toEqual('some-name')
  })

  it('should set the tray URL on blur', async () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: buildTray({
          url: 'http://some-url'
        })
      }
    }
    const {getByLabelText, store} = render(<TraySettings {...DEFAULT_PROPS} />, state)
    userEvent.click(getByLabelText('URL'))
    await userEvent.type(getByLabelText('URL'), 'http://some-new-url')
    getByLabelText('URL').blur()
    expect(getTrayUrl('trayId')(store.getState())).toEqual('http://some-new-url')
  })

  // TODO: figure out why this fails
  // It works in a browser correctly, so need to figure out if it's the dropdown implementation or an issue with
  // react-testing-library or the user-event library
  it.skip('should set the tray server type on change', async () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: buildTray({
          serverType: 'go'
        })
      }
    }
    const {getByTestId, store} = render(<TraySettings {...DEFAULT_PROPS} />, state)
    userEvent.selectOptions(getByTestId('tray-server-type'), 'jenkins')
    await wait(() => {
      expect(getTrayServerType('trayId')(store.getState())).toEqual('jenkins')
    })
  })

  it('should set the include new setting on click', () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: buildTray({
          includeNew: false
        })
      }
    }
    const {getByLabelText, store} = render(<TraySettings {...DEFAULT_PROPS} />, state)
    userEvent.click(getByLabelText('automatically include new projects'))
    expect(getTrayIncludeNew('trayId')(store.getState())).toBeTruthy()
  })

  it('should remove the tray when clicking the delete button', () => {
    const state = {
      [TRAYS_ROOT]: {
        trayId: buildTray()
      }
    }
    const {getByText, store} = render(
      <FakePage trayId='trayId'>
        <TraySettings {...DEFAULT_PROPS} />
      </FakePage>,
      state
    )
    userEvent.click(getByText('delete'))
    expect(getTray('trayId')(store.getState())).toBeUndefined()
  })

  it('should be able to change the auth to basic', async () => {
    jest.spyOn(SecurityGateway, 'encrypt').mockReturnValue(fakeRequest('some-encrypted-password'))
    const state = {
      [TRAYS_ROOT]: {
        trayId: buildTray({
          authType: AuthTypes.none
        })
      }
    }
    const {getByText, getByLabelText, getByTestId, store} = render(<TraySettings {...DEFAULT_PROPS} />, state)
    userEvent.click(getByText('change auth'))
    userEvent.click(getByLabelText('basic auth'))
    await userEvent.type(getByLabelText('username'), 'some-username')
    await userEvent.type(getByTestId('auth-password'), 'some-password')
    userEvent.click(getByText('save changes'))

    await wait(() => {
      expect(getTrayAuthType('trayId')(store.getState())).toEqual(AuthTypes.basic)
      expect(getTrayUsername('trayId')(store.getState())).toEqual('some-username')
      expect(getTrayPassword('trayId')(store.getState())).toEqual('some-encrypted-password')
    })
  })
})
