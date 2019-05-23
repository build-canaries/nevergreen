import {ideal} from '../../../../src/client/common/scale/ScaleText'

describe('ScaleText', () => {

  // actual scale of Roboto Mono
  const heightScale = 1.15
  const widthScale = 0.6

  const tests = [
    {
      sentences: ['beam post commit java validates runner dataflow'],
      height: 100,
      width: 652,
      expected: 23
    }, {
      sentences: ['dir kerby openjdk 2h', 'beam release nightly snapshot 3h'],
      height: 761,
      width: 652,
      expected: 95
    }, {
      sentences: ['dir kerby openjdk 2h', 'beam release nightly snapshot 3h', 'pre commit zookeeper github pr build 3h'],
      height: 616,
      width: 630,
      expected: 78
    }
  ]

  tests.forEach((test) => {
    it(`should calculate the ideal size for sentences [${test.sentences}] at size [${test.width}, ${test.height}]`, () => {
      const actual = ideal(test.sentences, test.height, test.width, heightScale, widthScale)
      expect(actual).toEqual(test.expected)
    })
  })
})
