import {moveData} from '../Migrate'
import {Migrate} from './index'

export const id = '001_MoveAudioVisualToSettings'

export const migrate: Migrate = (data) => {
  moveData(data, 'audioVisual', 'settings')
}
