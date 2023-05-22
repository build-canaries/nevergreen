import { render } from '../../../testUtils/testHelpers'
import {
  buildFeed,
  buildRemoteBackupLocation,
  buildState,
} from '../../../testUtils/builders'
import { screen, within } from '@testing-library/react'
import { ImportSuccessPage } from './ImportSuccessPage'
import { feedsRoot } from '../../tracking/FeedsReducer'
import { successRoot } from '../../success/SuccessReducer'
import { notificationsRoot } from '../../notifications/NotificationsReducer'
import { Prognosis } from '../../../domain/Project'
import { remoteLocationsRoot } from '../RemoteLocationsReducer'

function getCellByColumnAndRow(column: string, row: string) {
  const headers = screen.getAllByRole('columnheader')
  const rowElement = screen.getByRole('row', { name: new RegExp(row) })
  const columnIndex = headers.findIndex((el) => el.textContent === column)
  const cells = within(rowElement).getAllByRole('cell')
  return cells[columnIndex]
}

it('should show the number of feeds added', () => {
  const outletContext = buildState({
    [feedsRoot]: {},
  })
  const state = {
    [feedsRoot]: {
      feedId: buildFeed(),
    },
  }

  render(<ImportSuccessPage />, { state, outletContext })

  expect(getCellByColumnAndRow('Added', 'Feeds')).toHaveTextContent('1')
})

it('should show the number of feeds removed', () => {
  const outletContext = buildState({
    [feedsRoot]: {
      feedId: buildFeed(),
    },
  })
  const state = {
    [feedsRoot]: {},
  }

  render(<ImportSuccessPage />, { state, outletContext })

  expect(getCellByColumnAndRow('Removed', 'Feeds')).toHaveTextContent('1')
})

it('should show the number of success messages added', () => {
  const outletContext = buildState({
    [successRoot]: {
      messages: [],
    },
  })
  const state = {
    [successRoot]: {
      messages: ['message'],
    },
  }

  render(<ImportSuccessPage />, { state, outletContext })

  expect(getCellByColumnAndRow('Added', 'Success messages')).toHaveTextContent(
    '1'
  )
})

it('should show the number of success messages removed', () => {
  const outletContext = buildState({
    [successRoot]: {
      messages: ['message'],
    },
  })
  const state = {
    [successRoot]: {
      messages: [],
    },
  }

  render(<ImportSuccessPage />, { state, outletContext })

  expect(
    getCellByColumnAndRow('Removed', 'Success messages')
  ).toHaveTextContent('1')
})

it('should show the number of notifications added', () => {
  const outletContext = buildState({
    [notificationsRoot]: {
      notifications: {},
    },
  })
  const state = {
    [notificationsRoot]: {
      notifications: {
        [Prognosis.healthy]: {
          systemNotification: false,
          sfx: '',
        },
      },
    },
  }

  render(<ImportSuccessPage />, { state, outletContext })

  expect(getCellByColumnAndRow('Added', 'Notifications')).toHaveTextContent('1')
})

it('should show the number of notifications removed', () => {
  const outletContext = buildState({
    [notificationsRoot]: {
      notifications: {
        [Prognosis.healthy]: {
          systemNotification: false,
          sfx: '',
        },
      },
    },
  })
  const state = {
    [notificationsRoot]: {
      notifications: {},
    },
  }

  render(<ImportSuccessPage />, { state, outletContext })

  expect(getCellByColumnAndRow('Removed', 'Notifications')).toHaveTextContent(
    '1'
  )
})

it('should show the number of backup remote locations added', () => {
  const outletContext = buildState({
    [remoteLocationsRoot]: {},
  })
  const state = {
    [remoteLocationsRoot]: {
      id: buildRemoteBackupLocation(),
    },
  }

  render(<ImportSuccessPage />, { state, outletContext })

  expect(
    getCellByColumnAndRow('Added', 'Backup remote locations')
  ).toHaveTextContent('1')
})

it('should show the number of backup remote locations removed', () => {
  const outletContext = buildState({
    [remoteLocationsRoot]: {
      id: buildRemoteBackupLocation(),
    },
  })
  const state = {
    [remoteLocationsRoot]: {},
  }

  render(<ImportSuccessPage />, { state, outletContext })

  expect(
    getCellByColumnAndRow('Removed', 'Backup remote locations')
  ).toHaveTextContent('1')
})
