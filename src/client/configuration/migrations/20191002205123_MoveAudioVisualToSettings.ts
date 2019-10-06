import {Migration, moveData} from '../Migrate'

export const id = '20191002205123_MoveAudioVisualToSettings'

export const migrate: Migration = (data) => {
  moveData(data, 'audioVisual', 'settings')
}
