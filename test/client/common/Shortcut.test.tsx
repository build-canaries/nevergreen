import React from 'react'
import {Shortcut} from '../../../src/client/common/Shortcut'
import Mousetrap from 'mousetrap'
import {render} from '../testHelpers'

jest.mock('mousetrap')

it('should bind the hot keys', () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {bind, unbind} = Mousetrap
  const hotkeys = ['a']

  const {unmount} = render(<Shortcut hotkeys={hotkeys}/>)

  expect(bind).toBeCalledWith(hotkeys, expect.any(Function))

  unmount()

  expect(unbind).toBeCalledWith(hotkeys)
})
