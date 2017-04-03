import {combineReducers} from 'redux-immutable'
import {reduce as nevergreen} from './NevergreenReducer'
import {reduce as audioVisual} from './SettingsReducer'
import {reduce as trays} from './TraysReducer'
import {reduce as projects} from './ProjectsReducer'
import {reduce as success} from './SuccessReducer'
import {reduce as interesting} from './InterestingReducer'
import {reduce as github} from './GitHubReducer'
import {reduce as backupExport} from './ExportReducer'
import {reduce as backupImport} from './ImportReducer'
import {reduce as selected} from './SelectedReducer'
import {reduce as shortcut} from './ShortcutReducer'
import {reduce as notification} from './NotificationReducer'

export const reducer = combineReducers({
  nevergreen,
  audioVisual,
  trays,
  projects,
  success,
  interesting,
  github,
  selected,
  shortcut,
  notification,
  backupExport,
  backupImport
})
