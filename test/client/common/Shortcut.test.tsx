import React from 'react'
import {Shortcut} from '../../../src/client/common/Shortcut'
import Mousetrap from 'mousetrap'
import {render} from '../testHelpers'

it('should bind the hot keys', () => {
  jest.spyOn(Mousetrap, 'bind')
  jest.spyOn(Mousetrap, 'unbind')
  const {bind, unbind} = Mousetrap
  const hotkeys = ['a']

  const {unmount} = render(<Shortcut hotkeys={hotkeys}/>)

  expect(bind).toBeCalledWith(hotkeys, expect.any(Function))

  unmount()

  expect(unbind).toBeCalledWith(hotkeys)
})
