import type { RootState } from '../configuration/ReduxStore'
import { reducer } from '../configuration/ReduxStore'
import type { RecursivePartial } from '../common/Types'
import type { CombinedState, Middleware, Reducer } from 'redux'
import { combineReducers } from 'redux'
import type { RenderOptions, RenderResult } from '@testing-library/react'
import {
  render as testRender,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import type { AnyAction, EnhancedStore } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import merge from 'lodash/merge'
import { displaySettingsRoot } from '../settings/display/DisplaySettingsReducer'
import { selectedRoot } from '../settings/tracking/SelectedReducer'
import { successRoot } from '../settings/success/SuccessReducer'
import { feedsRoot } from '../settings/tracking/FeedsReducer'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import { migrationsRoot } from '../configuration/MigrationsReducer'
import parseISO from 'date-fns/parseISO'
import { remoteLocationsRoot } from '../settings/backup/RemoteLocationsReducer'
import userEvent from '@testing-library/user-event'
import type { UserEvent } from '@testing-library/user-event/setup/setup'
import { buildState } from './builders'
import { App } from '../App'
import { notificationsRoot } from '../settings/notifications/NotificationsReducer'
import { personalSettingsRoot } from '../settings/PersonalSettingsReducer'
import { otherSettingsRoot } from '../settings/other/OtherSettingsReducer'
import { UnhandledErrorMessage } from '../UnhandledErrorMessage'

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
  options: ExtendedRenderOptions = {},
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
    <App
      store={store}
      appElement="#root"
      router={createBrowserRouter([
        {
          element: <Outlet context={mergedOptions.outletContext} />,
          errorElement: <UnhandledErrorMessage />,
          children: [
            { path: mergedOptions.mountPath, element: children },
            { path: '*', element: <>location changed</> },
          ],
        },
      ])}
    />
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
  reducer: Partial<Reducer<RootState>>,
): Reducer<CombinedState<RootState>> {
  return combineReducers<RootState>(
    merge(
      {
        [displaySettingsRoot]: (state: any = null) => state,
        [otherSettingsRoot]: (state: any = null) => state,
        [selectedRoot]: (state: any = null) => state,
        [successRoot]: (state: any = null) => state,
        [feedsRoot]: (state: any = null) => state,
        [migrationsRoot]: (state: any = null) => state,
        [remoteLocationsRoot]: (state: any = null) => state,
        [notificationsRoot]: (state: any = null) => state,
        [personalSettingsRoot]: (state: any = null) => state,
      },
      reducer,
    ),
  )
}

/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */

export function setSystemTime(timestamp: string): void {
  jest.setSystemTime(parseISO(timestamp))
}

export function waitForLoadingToFinish() {
  return waitForElementToBeRemoved(screen.queryByTestId('loading'))
}

export async function waitForLocationToChange() {
  await screen.findByText('location changed')
}
