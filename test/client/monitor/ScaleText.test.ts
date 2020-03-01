import {ideal} from '../../../src/client/monitor/ScaleText'

// actual scale of Roboto Mono
const heightScale = 1.5
const widthScale = 0.6

it.each`
  sentences                                                                                                  | height | width  | expected
  ${['beam post commit java validates runner dataflow']}                                                     | ${100} | ${652} | ${25}
  ${['dir kerby openjdk 2h', 'beam release nightly snapshot 3h']}                                            | ${761} | ${652} | ${89}
  ${['dir kerby openjdk 2h', 'beam release nightly snapshot 3h', 'pre commit zookeeper github pr build 3h']} | ${616} | ${630} | ${72}
`('should calculate the ideal size for $sentences.length sentence(s) at size $width x $height', ({sentences, height, width, expected}) => {
  const actual = ideal(sentences, height, width, heightScale, widthScale, 0.5)
  expect(actual).toEqual(expected)
})
