import {render} from '../testHelpers'
import React from 'react'
import {setSystemTime} from '../clock'
import {VISUALLY_HIDDEN_ATTRIBUTE} from '../../../src/client/common/VisuallyHidden'
import {Duration} from '../../../src/client/common/Duration'

const DEFAULT_PROPS = {}

describe('abbreviated', () => {

  it.each(
    [null, undefined, '', '  ']
  )('should show ?? if timestamp is "%s"', (val) => {
    const props = {...DEFAULT_PROPS, abbreviate: true, timestamp: val}
    const {getByTestId} = render(<Duration {...props} />)
    expect(getByTestId('duration')).toHaveTextContent('??')
  })

  it('should display an abbreviated duration and a hidden full description for screen readers', () => {
    setSystemTime('2018-02-18T23:38:00Z')
    const props = {...DEFAULT_PROPS, abbreviate: true, timestamp: '2000-12-01T00:00:00Z'}
    const {container, getByTestId} = render(<Duration {...props} />)
    expect(getByTestId('duration')).toHaveTextContent('17y')
    expect(getByTestId('duration')).toHaveAttribute('aria-hidden', 'true')
    expect(container.querySelector(`[${VISUALLY_HIDDEN_ATTRIBUTE}="true"]`)).toHaveTextContent('about 17 years')
  })
})

it('should display the given prefix and suffix', () => {
  setSystemTime('2018-02-18T23:38:00Z')
  const props = {
    ...DEFAULT_PROPS,
    abbreviate: false,
    timestamp: '2000-12-01T00:00:00Z',
    fullDescriptionPrefix: 'some prefix',
    fullDescriptionSuffix: 'some suffix'
  }
  const {getByTestId} = render(<Duration {...props} />)
  expect(getByTestId('duration')).toHaveTextContent('some prefix about 17 years')
  expect(getByTestId('duration')).toHaveTextContent('about 17 years some suffix')
})
