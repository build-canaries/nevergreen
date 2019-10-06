import * as m01 from './20191002205123_MoveAudioVisualToSettings'
import {Migration} from '../Migrate'

export function getMigrations(): { [id: string]: Migration } {
  return {
    [m01.id]: m01.migrate
  }
}
