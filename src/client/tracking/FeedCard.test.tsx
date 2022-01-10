import React from 'react'
import {buildSavedProject, buildTray, render} from '../testHelpers'
import {screen} from '@testing-library/react'
import {FeedCard} from './FeedCard'
import {TRAYS_ROOT} from './TraysReducer'
import {PROJECTS_ROOT} from './ProjectsReducer'
import {SELECTED_ROOT} from './SelectedReducer'

it('should display the number of projects selected', () => {
  const feed = buildTray({
    trayId: 'trayId'
  })
  const state = {
    [TRAYS_ROOT]: {trayId: feed},
    [PROJECTS_ROOT]: {
      trayId: [
        buildSavedProject({projectId: '1', removed: false}),
        buildSavedProject({projectId: '2', removed: false}),
        buildSavedProject({projectId: '3', removed: false}),
        buildSavedProject({projectId: '4', removed: true})
      ]
    },
    [SELECTED_ROOT]: {trayId: ['1']}
  }
  render(<FeedCard feed={feed}/>, {state})
  expect(screen.getByText('Projects selected')).toBeInTheDocument()
  expect(screen.getByText('1 of 3')).toBeInTheDocument()
})
