import {render} from '../testHelpers'
import React from 'react'
import {setSystemTime} from '../clock'
import {Duration} from '../../../src/client/common/Duration'

it('should display the given prefix and suffix', () => {
  setSystemTime('2018-02-18T23:38:00Z')
  const props = {
    abbreviate: false,
    timestamp: '2000-12-01T00:00:00Z',
    prefix: 'some prefix',
    suffix: 'some suffix'
  }
  const {queryByText} = render(<Duration {...props} />)
  expect(queryByText('some prefix about 17 years some suffix')).toBeInTheDocument()
})
