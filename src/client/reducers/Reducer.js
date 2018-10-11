import {combineReducers} from 'redux-immutable'
import {NEVERGREEN_ROOT, reduce as nevergreen} from './NevergreenReducer'
import {reduce as audioVisual, SETTINGS_ROOT} from './SettingsReducer'
import {reduce as trays, TRAYS_ROOT} from './TraysReducer'
import {PROJECTS_ROOT, reduce as projects} from './ProjectsReducer'
import {reduce as success, SUCCESS_ROOT} from './SuccessReducer'
import {INTERESTING_ROOT, reduce as interesting} from './InterestingReducer'
import {GITHUB_ROOT, reduce as github} from './GitHubReducer'
import {EXPORT_ROOT, reduce as backupExport} from './ExportReducer'
import {IMPORT_ROOT, reduce as backupImport} from './ImportReducer'
import {reduce as selected, SELECTED_ROOT} from './SelectedReducer'
import {reduce as shortcut, SHORTCUT_ROOT} from './ShortcutReducer'
import {NOTIFICATION_ROOT, reduce as notification} from './NotificationReducer'
import {PENDING_REQUESTS_ROOT, reduce as pendingRequests} from './PendingRequestsReducer'

export const reducer = combineReducers({
  [SETTINGS_ROOT]: audioVisual,
  [EXPORT_ROOT]: backupExport,
  [IMPORT_ROOT]: backupImport,
  [GITHUB_ROOT]: github,
  [INTERESTING_ROOT]: interesting,
  [NEVERGREEN_ROOT]: nevergreen,
  [NOTIFICATION_ROOT]: notification,
  [PENDING_REQUESTS_ROOT]: pendingRequests,
  [PROJECTS_ROOT]: projects,
  [SELECTED_ROOT]: selected,
  [SUCCESS_ROOT]: success,
  [SHORTCUT_ROOT]: shortcut,
  [TRAYS_ROOT]: trays
})
