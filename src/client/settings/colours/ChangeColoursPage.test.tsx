import { render } from '../../testUtils/testHelpers'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { ChangeColoursPage } from './ChangeColoursPage'
import { Prognosis } from '../../domain/Project'

// Color inputs not supported by user events
// https://github.com/testing-library/user-event/issues/423

it('should be able to change colours', async () => {
  let backgroundColour = '#aaaaaa'
  let textColour = '#bbbbbb'

  const { user } = render(
    <ChangeColoursPage
      title=""
      onCancel=""
      initialBackgroundColour={backgroundColour}
      initialTextColour={textColour}
      group={Prognosis.error}
      onSuccess={(background, text) => {
        backgroundColour = background
        textColour = text
        return 'success-url'
      }}
    />,
  )
  fireEvent.input(screen.getByLabelText('Background colour'), {
    target: { value: '#cccccc' },
  })
  fireEvent.input(screen.getByLabelText('Text colour'), {
    target: { value: '#dddddd' },
  })
  await user.click(screen.getByRole('button', { name: 'Save' }))

  expect(backgroundColour).toEqual('#cccccc')
  expect(textColour).toEqual('#dddddd')
  await waitFor(() => {
    expect(window.location.pathname).toEqual('/success-url')
  })
})

it('should be able to cancel making changes', async () => {
  const { user } = render(
    <ChangeColoursPage
      title=""
      onCancel="cancelled-url"
      initialBackgroundColour=""
      initialTextColour=""
      group={Prognosis.error}
      onSuccess={() => {
        return ''
      }}
    />,
  )
  await user.click(screen.getByRole('link', { name: 'Cancel' }))

  expect(window.location.pathname).toEqual('/cancelled-url')
})

it('should show a warning if contrast is low', () => {
  let backgroundColour = '#000000'
  let textColour = '#000000'

  render(
    <ChangeColoursPage
      title=""
      onCancel=""
      initialBackgroundColour={backgroundColour}
      initialTextColour={textColour}
      group={Prognosis.error}
      onSuccess={(background, text) => {
        backgroundColour = background
        textColour = text
        return 'success-url'
      }}
    />,
  )

  expect(
    screen.getByText(
      'The chosen colours have a low perceptual lightness contrast.',
    ),
  ).toBeInTheDocument()
  expect(
    screen.getByText(
      'You should consider picking different colours to improve readability.',
    ),
  ).toBeInTheDocument()
})

it('should be able to select default preset colours', async () => {
  let backgroundColour = '#000000'
  let textColour = '#000000'

  const { user } = render(
    <ChangeColoursPage
      title=""
      onCancel=""
      initialBackgroundColour={backgroundColour}
      initialTextColour={textColour}
      group={Prognosis.error}
      onSuccess={(background, text) => {
        backgroundColour = background
        textColour = text
        return 'success-url'
      }}
    />,
  )

  await user.click(screen.getByRole('button', { name: 'Default' }))

  expect(screen.getByLabelText('Background colour')).toHaveValue('#de3535')
  expect(screen.getByLabelText('Text colour')).toHaveValue('#ffffff')
})
