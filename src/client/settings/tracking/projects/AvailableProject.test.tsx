import {render} from '../../../testHelpers'
import React from 'react'
import {AvailableProject} from './AvailableProject'
import noop from 'lodash/noop'
import {screen} from '@testing-library/react'

const defaultProps = {
  description: '',
  selectProject: noop
}

it('should render new tag if the project is new', () => {
  const props = {...defaultProps, isNew: true}
  render(<AvailableProject {...props} />)
  expect(screen.getByText('new')).toBeInTheDocument()
  expect(screen.queryByText('removed')).not.toBeInTheDocument()
})

it('should render removed tag if the project was removed', () => {
  const props = {...defaultProps, removed: true}
  render(<AvailableProject {...props} />)
  expect(screen.getByText('removed')).toBeInTheDocument()
  expect(screen.queryByText('new')).not.toBeInTheDocument()
})

it('should render the description', () => {
  const props = {...defaultProps, description: 'name stage'}
  render(<AvailableProject {...props} />)
  expect(screen.getByText('name stage')).toBeInTheDocument()
})
