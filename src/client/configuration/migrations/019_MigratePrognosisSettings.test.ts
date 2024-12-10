import { migrate } from './019_MigratePrognosisSettings'
import { UntrustedData } from '../LocalRepository'
import { sortedPrognosisByPriority } from '../../domain/Project'

it('should return the given data if it does not contain settings', () => {
  const data = { foo: 'bar' }
  migrate(data)
  expect(data).toEqual({ foo: 'bar' })
})

it.each(sortedPrognosisByPriority())(
  'should migrate %p prognosis settings',
  (prognosis) => {
    const data: UntrustedData = {
      notifications: {
        notifications: {
          [prognosis]: { systemNotification: true, sfx: 'some-sfx' },
        },
      },
      settings: {
        showPrognosis: [prognosis],
        [prognosis]: {
          backgroundColour: '#aaa',
          textColour: '#bbb',
        },
      },
    }
    migrate(data)
    expect(data).toEqual(
      expect.objectContaining({
        prognosis: expect.objectContaining({
          [prognosis]: {
            show: true,
            systemNotification: true,
            sfx: 'some-sfx',
            backgroundColour: '#aaa',
            textColour: '#bbb',
          },
        }) as unknown,
      }),
    )
  },
)
