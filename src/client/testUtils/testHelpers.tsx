import React, {ReactElement, ReactNode} from 'react'
import merge from 'lodash/merge'
import {reducer, State} from '../Reducer'
import {SETTINGS_ROOT} from '../settings/SettingsReducer'
import {SELECTED_ROOT} from '../settings/tracking/SelectedReducer'
import {SUCCESS_ROOT} from '../settings/success/SuccessReducer'
import {FEEDS_ROOT} from '../settings/tracking/FeedsReducer'
import {CombinedState, combineReducers, Middleware, Reducer} from 'redux'
import {RecursivePartial} from '../common/Types'
import {
  render as testRender,
  RenderOptions,
  RenderResult,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import {AnyAction, configureStore, EnhancedStore} from '@reduxjs/toolkit'
import {Outlet} from 'react-router-dom'
import {APPLIED_MIGRATIONS_ROOT} from '../configuration/MigrationsReducer'
import parseISO from 'date-fns/parseISO'
import {BACKUP_REMOTE_LOCATIONS_ROOT} from '../settings/backup/RemoteLocationsReducer'
import {Route, Routes} from 'react-router'
import userEvent from '@testing-library/user-event'
import {UserEvent} from '@testing-library/user-event/setup/setup'
import {buildState} from './builders'
import {App} from '../App'

interface ExtendedRenderResult extends RenderResult {
  readonly store: EnhancedStore<State, AnyAction, ReadonlyArray<Middleware<unknown, State>>>;
  readonly user: UserEvent;
}

interface ExtendedRenderOptions extends RenderOptions {
  readonly mountPath?: string;
  readonly currentLocation?: string;
  readonly state?: RecursivePartial<State>;
  readonly outletContext?: unknown;
}

export function render(component: ReactElement, options: ExtendedRenderOptions = {}): ExtendedRenderResult {
  const appElement = document.createElement('div')
  appElement.setAttribute('id', 'root')

  const mergedOptions = {
    mountPath: '/',
    currentLocation: '/',
    state: {},
    container: document.body.appendChild(appElement),
    baseElement: document.body,
    ...options
  }
  const store = configureStore({reducer, preloadedState: buildState(mergedOptions.state)})

  window.history.pushState({}, '', mergedOptions.currentLocation)

  const user = userEvent.setup({
    advanceTimers: (delay) => {
      jest.advanceTimersByTime(delay)
    }
  })

  const wrapper = ({children}: { children: ReactNode }) => (
    <App store={store} appElement="#root">
      <Routes>
        <Route element={<Outlet context={mergedOptions.outletContext}/>}>
          <Route path={mergedOptions.mountPath} element={children}/>
          <Route path="*" element={<>location changed</>}/>
        </Route>
      </Routes>
    </App>
  )

  const view = testRender(component, {
    ...options,
    wrapper
  })

  return {
    ...view,
    store,
    user
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
export function testReducer(reducer: Partial<Reducer<State>>): Reducer<CombinedState<State>> {
  return combineReducers<State>(merge({
    [SETTINGS_ROOT]: (state: any = null) => state,
    [SELECTED_ROOT]: (state: any = null) => state,
    [SUCCESS_ROOT]: (state: any = null) => state,
    [FEEDS_ROOT]: (state: any = null) => state,
    [APPLIED_MIGRATIONS_ROOT]: (state: any = null) => state,
    [BACKUP_REMOTE_LOCATIONS_ROOT]: (state: any = null) => state
  }, reducer))
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
