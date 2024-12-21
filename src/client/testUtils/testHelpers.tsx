import type { RootState } from '../configuration/ReduxStore'
import { reducer } from '../configuration/ReduxStore'
import type { RecursivePartial } from '../common/Types'
import type {
  EnhancedStore,
  Reducer,
  StoreEnhancer,
  UnknownAction,
} from '@reduxjs/toolkit'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { RenderOptions, RenderResult } from '@testing-library/react'
import {
  render as testRender,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import type { DisplaySettingsState } from '../settings/display/DisplaySettingsReducer'
import { displaySettingsRoot } from '../settings/display/DisplaySettingsReducer'
import {
  selectedRoot,
  SelectedState,
} from '../settings/tracking/SelectedReducer'
import type { SuccessState } from '../settings/success/SuccessReducer'
import { successRoot } from '../settings/success/SuccessReducer'
import type { FeedsState } from '../settings/tracking/FeedsReducer'
import { feedsRoot } from '../settings/tracking/FeedsReducer'
import { createBrowserRouter, Outlet } from 'react-router'
import type { AppliedMigrationsState } from '../configuration/MigrationsReducer'
import { migrationsRoot } from '../configuration/MigrationsReducer'
import { parseISO } from 'date-fns/parseISO'
import type { RemoteLocationsState } from '../settings/backup/RemoteLocationsReducer'
import { remoteLocationsRoot } from '../settings/backup/RemoteLocationsReducer'
import userEvent from '@testing-library/user-event'
import type { UserEvent } from '@testing-library/user-event'
import { buildState } from './builders'
import { App } from '../App'
import type { NotificationsState } from '../settings/notifications/NotificationsReducer'
import { notificationsRoot } from '../settings/notifications/NotificationsReducer'
import type { PersonalSettingsState } from '../settings/PersonalSettingsReducer'
import { personalSettingsRoot } from '../settings/PersonalSettingsReducer'
import type { OtherSettingsState } from '../settings/other/OtherSettingsReducer'
import { otherSettingsRoot } from '../settings/other/OtherSettingsReducer'
import { UnhandledErrorMessage } from '../UnhandledErrorMessage'
import {
  prognosisSettingsRoot,
  PrognosisSettingsState,
} from '../settings/prognosis/PrognosisSettingsReducer'

interface ExtendedRenderResult extends RenderResult {
  readonly store: EnhancedStore<
    RootState,
    UnknownAction,
    ReadonlyArray<StoreEnhancer<object, RootState>>
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
    // eslint-disable-next-line testing-library/no-node-access
    document.querySelector('#root') ?? document.createElement('div')
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

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
export function testReducer(
  reducer: Partial<Reducer<RootState>>,
): Reducer<RootState> {
  return combineReducers({
    [displaySettingsRoot]: (state: DisplaySettingsState) => state ?? null,
    [otherSettingsRoot]: (state: OtherSettingsState) => state ?? null,
    [selectedRoot]: (state: SelectedState) => state ?? null,
    [successRoot]: (state: SuccessState) => state ?? null,
    [feedsRoot]: (state: FeedsState) => state ?? null,
    [migrationsRoot]: (state: AppliedMigrationsState) => state ?? null,
    [remoteLocationsRoot]: (state: RemoteLocationsState) => state ?? null,
    [notificationsRoot]: (state: NotificationsState) => state ?? null,
    [personalSettingsRoot]: (state: PersonalSettingsState) => state ?? null,
    [prognosisSettingsRoot]: (state: PrognosisSettingsState) => state ?? null,
    ...reducer,
  })
}
/* eslint-enable @typescript-eslint/no-unnecessary-condition */

export function setSystemTime(timestamp: string): void {
  jest.setSystemTime(parseISO(timestamp))
}

export function waitForLoadingToFinish(): Promise<void> {
  return waitForElementToBeRemoved(() => screen.queryByTestId('loading'))
}

export async function waitForLocationToChange(): Promise<void> {
  await screen.findByText('location changed')
}
