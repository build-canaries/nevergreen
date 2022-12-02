import {Configuration} from '../../configuration/Configuration'
import {createAction} from '@reduxjs/toolkit'

export const configurationImported = createAction<Configuration>('configurationImported')
