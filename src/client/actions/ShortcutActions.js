import {KEYBOARD_SHORTCUT} from './Actions'

export function keyboardShortcut(show) {
  return {
    type: KEYBOARD_SHORTCUT,
    show
  }
}
