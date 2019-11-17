import {render} from '../../testHelpers'
import React from 'react'
import {AvailableProject} from '../../../../src/client/tracking/projects/AvailableProject'
import {noop} from 'lodash'

const DEFAULT_PROPS = {
  name: '',
  selectProject: noop
}

it('should render new tag if the project is new', function () {
  const props = {...DEFAULT_PROPS, isNew: true}
  const {queryByText} = render(<AvailableProject {...props} />)
  expect(queryByText('new')).toBeInTheDocument()
  expect(queryByText('removed')).not.toBeInTheDocument()
})

it('should render removed tag if the project was removed', function () {
  const props = {...DEFAULT_PROPS, removed: true}
  const {queryByText} = render(<AvailableProject {...props} />)
  expect(queryByText('removed')).toBeInTheDocument()
  expect(queryByText('new')).not.toBeInTheDocument()
})

it('should render the name and stage', function () {
  const props = {...DEFAULT_PROPS, name: 'name', stage: 'stage'}
  const {getByTestId} = render(<AvailableProject {...props} />)
  expect(getByTestId('name')).toHaveTextContent('name stage')
})
