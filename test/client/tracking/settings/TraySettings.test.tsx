import React, {ReactNode} from 'react'
import {waitFor} from '@testing-library/react'
import {TraySettings} from '../../../../src/client/tracking/settings/TraySettings'
import {buildTray, render, setupReactModal} from '../../testHelpers'
import {getTrays, TRAYS_ROOT} from '../../../../src/client/tracking/TraysReducer'
import userEvent from '@testing-library/user-event'
import {AuthTypes} from '../../../../src/client/domain/Tray'
import * as SecurityGateway from '../../../../src/client/gateways/SecurityGateway'
import {fakeRequest} from '../../../../src/client/gateways/Gateway'
import {useSelector} from 'react-redux'
import {noop} from 'lodash'

const FakePage = ({trayId, children}: { trayId: string; children: ReactNode }) => {
  const trayExists = useSelector(getTrays).some((tray) => tray.trayId === trayId)
  return (
    <div>
      {trayExists && children}
    </div>
  )
}

const DEFAULT_PROPS = {
  tray: buildTray(),
  setRequiresRefresh: noop
}

beforeEach(setupReactModal)

it('should set the tray name on blur', () => {
  const tray = buildTray({
    trayId: 'trayId',
    name: 'some-name'
  })
  const state = {
    [TRAYS_ROOT]: {trayId: tray}
  }
  const {getByLabelText, store} = render(<TraySettings {...DEFAULT_PROPS} tray={tray}/>, state)

  const nameInput = getByLabelText('Name')
  userEvent.clear(nameInput)
  userEvent.type(nameInput, 'some-new-name')
  nameInput.blur()

  expect(getTrays(store.getState())[0].name).toEqual('some-new-name')
})

it('should generate a new random name', () => {
  const tray = buildTray({
    trayId: 'trayId',
    name: 'some-name'
  })
  const state = {
    [TRAYS_ROOT]: {trayId: tray}
  }
  const {getByText, store} = render(<TraySettings {...DEFAULT_PROPS} tray={tray}/>, state)
  userEvent.click(getByText('randomise name'))

  expect(getTrays(store.getState())[0].name).not.toEqual('some-name')
})

it('should set the tray URL on blur if it is different', () => {
  const setRequiresRefresh = jest.fn()
  const tray = buildTray({
    trayId: 'trayId',
    url: 'http://some-url'
  })
  const state = {
    [TRAYS_ROOT]: {trayId: tray}
  }
  const props = {...DEFAULT_PROPS, tray, setRequiresRefresh}

  const {getByLabelText, store} = render(<TraySettings {...props}/>, state)

  const urlInput = getByLabelText('URL')
  userEvent.clear(urlInput)
  userEvent.type(urlInput, 'http://some-new-url')
  urlInput.blur()

  expect(setRequiresRefresh).toHaveBeenCalledWith(true)
  expect(getTrays(store.getState())[0].url).toEqual('http://some-new-url')
})

it('should not call requires refresh if the URL is the same', () => {
  const setRequiresRefresh = jest.fn()
  const tray = buildTray({
    trayId: 'trayId',
    url: 'http://some-url'
  })
  const state = {
    [TRAYS_ROOT]: {trayId: tray}
  }
  const props = {...DEFAULT_PROPS, tray, setRequiresRefresh}

  const {getByLabelText} = render(<TraySettings {...props}/>, state)

  const urlInput = getByLabelText('URL')
  userEvent.clear(urlInput)
  userEvent.type(urlInput, 'http://some-url')
  urlInput.blur()

  expect(setRequiresRefresh).not.toHaveBeenCalled()
})

// TODO: This fails with "RangeError: Maximum call stack size exceeded" since updating to Jest v25 which upgraded JSDOM
//  from v11 to v15.
xit('should set the tray server type on change', () => {
  const setRequiresRefresh = jest.fn()
  const tray = buildTray({
    trayId: 'trayId',
    serverType: 'go'
  })
  const state = {
    [TRAYS_ROOT]: {trayId: tray}
  }
  const props = {...DEFAULT_PROPS, tray, setRequiresRefresh}

  const {getByTestId, store} = render(<TraySettings {...props} />, state)
  userEvent.selectOptions(getByTestId('tray-server-type'), 'circle')

  expect(setRequiresRefresh).toHaveBeenCalledWith(true)
  expect(getTrays(store.getState())[0].serverType).toEqual('circle')
})

it('should set the include new setting on click without refreshing the tray', () => {
  const setRequiresRefresh = jest.fn()
  const tray = buildTray({
    trayId: 'trayId',
    includeNew: false
  })
  const state = {
    [TRAYS_ROOT]: {trayId: tray}
  }
  const props = {...DEFAULT_PROPS, tray, setRequiresRefresh}

  const {getByLabelText, store} = render(<TraySettings {...props}/>, state)
  userEvent.click(getByLabelText('Automatically include new projects'))

  expect(setRequiresRefresh).not.toHaveBeenCalled()
  expect(getTrays(store.getState())[0].includeNew).toBeTruthy()
})

it('should remove the tray when clicking the delete button', () => {
  const tray = buildTray({
    trayId: 'trayId'
  })
  const state = {
    [TRAYS_ROOT]: {trayId: tray}
  }
  const {getByText, store} = render(
    <FakePage trayId='trayId'>
      <TraySettings {...DEFAULT_PROPS} tray={tray}/>
    </FakePage>,
    state
  )
  userEvent.click(getByText('Delete feed'))
  expect(getTrays(store.getState())).toEqual([])
})

it('should be able to change the auth to basic', async () => {
  jest.spyOn(SecurityGateway, 'encrypt').mockReturnValue(fakeRequest('some-encrypted-password'))
  const setRequiresRefresh = jest.fn()
  const tray = buildTray({
    trayId: 'trayId',
    authType: AuthTypes.none
  })
  const state = {
    [TRAYS_ROOT]: {trayId: tray}
  }
  const props = {...DEFAULT_PROPS, tray, setRequiresRefresh}

  const {getByText, getByLabelText, store} = render(<TraySettings {...props}/>, state)
  userEvent.click(getByText('Change auth'))
  userEvent.click(getByLabelText('Basic auth'))
  userEvent.type(getByLabelText('Username'), 'some-username')
  userEvent.type(getByLabelText('Password'), 'some-password')
  userEvent.click(getByText('Save changes'))

  await waitFor(() => {
    expect(setRequiresRefresh).toHaveBeenCalledWith(true)
    expect(getTrays(store.getState())[0].authType).toEqual(AuthTypes.basic)
    expect(getTrays(store.getState())[0].username).toEqual('some-username')
    expect(getTrays(store.getState())[0].encryptedPassword).toEqual('some-encrypted-password')
  })
})
