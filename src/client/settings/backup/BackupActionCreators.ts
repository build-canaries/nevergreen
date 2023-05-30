import { Configuration } from '../../configuration/Configuration'
import { createAction } from '@reduxjs/toolkit'
import { RemoteLocation } from './RemoteLocationsReducer'
import { now } from '../../common/DateTime'

export const configurationImported = createAction(
  'configurationImported',
  (configuration: Configuration, fromLocation?: RemoteLocation) => {
    return {
      payload: {
        configuration,
        fromLocation,
        timestamp: now(),
      },
    }
  }
)
