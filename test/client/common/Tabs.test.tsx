import React from 'react'
import {Tabs} from '../../../src/client/common/Tabs'
import {render} from '../testHelpers'

it('should render the correct number of tabs and panels', () => {
  const props = {titles: ['a', 'b']}
  const {getAllByRole} = render(
    <Tabs {...props}>
      <div key='a'/>
      <div key='b'/>
    </Tabs>
  )
  expect(getAllByRole('tab')).toHaveLength(2)
  expect(getAllByRole('tabpanel')).toHaveLength(2)
})
