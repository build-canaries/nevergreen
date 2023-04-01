import { render } from '../../testUtils/testHelpers'
import { fireEvent, screen } from '@testing-library/react'
import { ChangeColoursPage } from './ChangeColoursPage'

it('should be able to change colours', async () => {
  let backgroundColour = '#aaaaaa'
  let textColour = '#bbbbbb'

  const { user } = render(
    <ChangeColoursPage
      title=""
      onCancel=""
      initialBackgroundColour={backgroundColour}
      initialTextColour={textColour}
      onSuccess={(background, text) => {
        backgroundColour = background
        textColour = text
        return 'success-url'
      }}
    />
  )
  // Color inputs not supported by user events
  // https://github.com/testing-library/user-event/issues/423
  fireEvent.input(screen.getByLabelText('Background colour'), {
    target: { value: '#cccccc' },
  })
  fireEvent.input(screen.getByLabelText('Text colour'), {
    target: { value: '#dddddd' },
  })
  await user.click(screen.getByRole('button', { name: 'Save' }))

  expect(backgroundColour).toEqual('#cccccc')
  expect(textColour).toEqual('#dddddd')
  expect(window.location.pathname).toEqual('/success-url')
})

it('should be able to cancel making changes', async () => {
  const { user } = render(
    <ChangeColoursPage
      title=""
      onCancel="cancelled-url"
      initialBackgroundColour=""
      initialTextColour=""
      onSuccess={() => {
        return ''
      }}
    />
  )
  await user.click(screen.getByRole('button', { name: 'Cancel' }))

  expect(window.location.pathname).toEqual('/cancelled-url')
})
