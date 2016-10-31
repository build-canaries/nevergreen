export const KEYBOARD_SHORTCUT = 'KEYBOARD_SHORTCUT'
export function keyboardShortcut(show) {
  return {
    type: KEYBOARD_SHORTCUT,
    show
  }
}
