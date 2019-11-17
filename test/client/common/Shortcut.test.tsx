import React from 'react'
import {Shortcut} from '../../../src/client/common/Shortcut'
import Mousetrap from 'mousetrap'
import {render} from '../testHelpers'

it('should bind the hot keys', () => {
  jest.spyOn(Mousetrap, 'bind')
  jest.spyOn(Mousetrap, 'unbind')
  const hotkeys = ['a']

  const {unmount} = render(<Shortcut hotkeys={hotkeys}/>)

  expect(Mousetrap.bind).toBeCalledWith(hotkeys, expect.any(Function))

  unmount()

  expect(Mousetrap.unbind).toBeCalledWith(hotkeys)
})
