import {enrichErrors, isError, toFeedApiError} from './FeedError'
import {buildProject, buildFeedError} from '../testUtils/builders'
import * as DateTime from '../common/DateTime'
import {Prognosis, ProjectPrognosis} from './Project'

describe('toFeedApiError', () => {

  it('should set the prognosis to error', () => {
    expect(toFeedApiError(new Error())).toHaveProperty('prognosis', Prognosis.error)
  })

  it('should set the timestamp to now', () => {
    jest.spyOn(DateTime, 'now').mockReturnValue('now')
    expect(toFeedApiError(new Error())).toHaveProperty('timestamp', 'now')
  })

  it('should set the exception message as description', () => {
    expect(toFeedApiError(new Error('some-error'))).toHaveProperty('description', 'some-error')
  })
})

describe('isError', () => {

  it('should be true when error', () => {
    expect(isError(buildFeedError())).toBe(true)
  })

  it.each<ProjectPrognosis>([
    Prognosis.unknown,
    Prognosis.healthy,
    Prognosis.healthyBuilding,
    Prognosis.sick,
    Prognosis.sickBuilding
  ])('should be false for value %s', (prognosis) => {
    expect(isError(buildProject({prognosis}))).toBe(false)
  })
})

describe('enrichErrors', () => {

  it('should add how long a feed has been in error', () => {
    const fetched = [buildFeedError({
      timestamp: 'updated-fetched-time',
      webUrl: 'some-url'
    })]
    const previous = [buildFeedError({
      timestamp: 'original-fetched-time',
      webUrl: 'some-url'
    })]
    const result = enrichErrors(fetched, previous)
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({timestamp: 'original-fetched-time'})]))
  })

  it('should add the previous prognosis if the error was previously fetched', () => {
    const fetched = [buildFeedError({
      trayId: 'some-id',
      prognosis: Prognosis.error
    })]
    const previous = [buildFeedError({
      trayId: 'some-id',
      prognosis: Prognosis.error
    })]
    const result = enrichErrors(fetched, previous)
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({previousPrognosis: Prognosis.error})]))
  })
})
