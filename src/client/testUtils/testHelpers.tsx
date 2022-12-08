import type { RootState } from '../configuration/ReduxStore'
import { reducer } from '../configuration/ReduxStore'
import React, { ReactElement, ReactNode } from 'react'
import merge from 'lodash/merge'
import { settingsRoot as settingsName } from '../settings/SettingsReducer'
import { selectedRoot as selectedName } from '../settings/tracking/SelectedReducer'
import { successRoot as successName } from '../settings/success/SuccessReducer'
import { feedsRoot as feedsName } from '../settings/tracking/FeedsReducer'
import { CombinedState, combineReducers, Middleware, Reducer } from 'redux'
import { RecursivePartial } from '../common/Types'
import {
  render as testRender,
  RenderOptions,
  RenderResult,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { AnyAction, configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { Outlet } from 'react-router-dom'
import { migrationsRoot as migrationsName } from '../configuration/MigrationsReducer'
import parseISO from 'date-fns/parseISO'
import { remoteLocationsRoot as remoteLocationsName } from '../settings/backup/RemoteLocationsReducer'
import { Route, Routes } from 'react-router'
import userEvent from '@testing-library/user-event'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { buildState } from './builders'
import { App } from '../App'
import { notificationsRoot as notificationsName } from '../settings/notifications/NotificationsReducer'

interface ExtendedRenderResult extends RenderResult {
  readonly store: EnhancedStore<
    RootState,
    AnyAction,
    ReadonlyArray<Middleware<unknown, RootState>>
  >
  readonly user: UserEvent
}

interface ExtendedRenderOptions extends RenderOptions {
  readonly mountPath?: string
  readonly currentLocation?: string
  readonly state?: RecursivePartial<RootState>
  readonly outletContext?: unknown
}

export function render(
  component: ReactElement,
  options: ExtendedRenderOptions = {}
): ExtendedRenderResult {
  const appElement =
    document.querySelector('#root') || document.createElement('div')
  appElement.setAttribute('id', 'root')

  const mergedOptions = {
    mountPath: '/',
    currentLocation: '/',
    state: {},
    container: document.body.appendChild(appElement),
    baseElement: document.body,
    ...options,
  }
  const store = configureStore({
    reducer,
    preloadedState: buildState(mergedOptions.state),
  })

  window.history.pushState({}, '', mergedOptions.currentLocation)

  const user = userEvent.setup({
    advanceTimers: (delay) => {
      jest.advanceTimersByTime(delay)
    },
  })

  const wrapper = ({ children }: { children: ReactNode }) => (
    <App store={store} appElement="#root">
      <Routes>
        <Route element={<Outlet context={mergedOptions.outletContext} />}>
          <Route path={mergedOptions.mountPath} element={children} />
          <Route path="*" element={<>location changed</>} />
        </Route>
      </Routes>
    </App>
  )

  const view = testRender(component, {
    ...options,
    wrapper,
  })

  return {
    ...view,
    store,
    user,
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
export function testReducer(
  reducer: Partial<Reducer<RootState>>
): Reducer<CombinedState<RootState>> {
  return combineReducers<RootState>(
    merge(
      {
        [settingsName]: (state: any = null) => state,
        [selectedName]: (state: any = null) => state,
        [successName]: (state: any = null) => state,
        [feedsName]: (state: any = null) => state,
        [migrationsName]: (state: any = null) => state,
        [remoteLocationsName]: (state: any = null) => state,
        [notificationsName]: (state: any = null) => state,
      },
      reducer
    )
  )
}

/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */

export function setSystemTime(timestamp: string): void {
  jest.useFakeTimers()
  jest.setSystemTime(parseISO(timestamp))
}

export function waitForLoadingToFinish() {
  return waitForElementToBeRemoved(screen.queryByTestId('loading'))
}

export async function waitForLocationToChange() {
  await screen.findByText('location changed')
}
