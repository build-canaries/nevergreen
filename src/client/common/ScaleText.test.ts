import { ideal } from './ScaleText'

interface TestProps {
  readonly sentences: ReadonlyArray<string>
  readonly height: number
  readonly width: number
  readonly expected: number
}

// actual scale of Roboto Mono
const heightScale = 1.5
const widthScale = 0.6

it.each`
  sentences                                                                               | height | width   | expected
  ${['123456']}                                                                           | ${557} | ${622}  | ${134}
  ${['1234567']}                                                                          | ${557} | ${672}  | ${128}
  ${['12345678']}                                                                         | ${557} | ${672}  | ${114}
  ${['12345678']}                                                                         | ${570} | ${1024} | ${175}
  ${['success building project', 'failure sleeping project', 'failure building project']} | ${118} | ${662}  | ${41}
`(
  'should calculate the ideal size for $sentences.length sentence(s) at size $width x $height',
  ({ sentences, height, width, expected }: TestProps) => {
    const actual = ideal(sentences, height, width, heightScale, widthScale, 0.5)
    expect(actual).toEqual(expected)
  },
)
