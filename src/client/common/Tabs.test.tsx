import React from 'react'
import {Tabs} from './Tabs'
import {render} from '../testHelpers'
import {screen} from '@testing-library/react'

it('should render the correct number of tabs and panels', () => {
  const props = {titles: ['a', 'b']}
  render(
    <Tabs {...props}>
      <div key='a'/>
      <div key='b'/>
    </Tabs>
  )
  expect(screen.getAllByRole('tab')).toHaveLength(2)
  expect(screen.getAllByRole('tabpanel')).toHaveLength(2)
})
