import { Migrate } from './index'
import { moveData } from '../Migrate'

export const id = '017_MoveClickToShowMenuSetting'

export const migrate: Migrate = (data) => {
  moveData(data, 'settings.clickToShowMenu', 'otherSettings.clickToShowMenu')
}
