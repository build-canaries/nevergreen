import {toConfiguration} from '../../../src/client/configuration/Configuration'
import {isLeft, isRight} from 'fp-ts/lib/Either'

it('rejects a tray with a missing ID, as this is required to match projects to the owning tray', () => {
  const data = {
    trays: {
      'some-key': {
        url: 'some-url'
      }
    }
  }
  const result = toConfiguration(data)
  expect(isLeft(result)).toBeTruthy()
  if (isLeft(result)) {
    expect(result.left).not.toHaveLength(0)
  }
})

it('rejects a tray with a missing URL, as this is required to actually contact the CI server', () => {
  const data = {
    trays: {
      'some-id': {
        trayId: 'some-id'
      }
    }
  }
  const result = toConfiguration(data)
  expect(isLeft(result)).toBeTruthy()
  if (isLeft(result)) {
    expect(result.left).not.toHaveLength(0)
  }
})

it('rejects a project with a missing ID, as this is required to select projects', () => {
  const data = {
    projects: {
      'some-tray-id': {
        'some-project-id': {name: 'some-name'}
      }
    }
  }
  const result = toConfiguration(data)
  expect(isLeft(result)).toBeTruthy()
  if (isLeft(result)) {
    expect(result.left).not.toHaveLength(0)
  }
})

it('rejects a project with a missing name, as this is required to display projects on the UI', () => {
  const data = {
    projects: {
      'some-tray-id': {
        'some-project-id': {projectId: 'some-id'}
      }
    }
  }
  const result = toConfiguration(data)
  expect(isLeft(result)).toBeTruthy()
  if (isLeft(result)) {
    expect(result.left).not.toHaveLength(0)
  }
})

it('removes unknown properties', () => {
  const data = {foo: 'bar'}
  const result = toConfiguration(data)
  expect(isRight(result)).toBeTruthy()
  if (isRight(result)) {
    expect(result.right).not.toHaveProperty('foo')
  }
})

it('keeps known properties', () => {
  const data = {trays: {}}
  const result = toConfiguration(data)
  expect(isRight(result)).toBeTruthy()
  if (isRight(result)) {
    expect(result.right).toEqual(expect.objectContaining({trays: {}}))
  }
})
