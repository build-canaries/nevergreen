import type { ReactElement } from 'react'
import { lazy, Suspense, useState } from 'react'
import { Modal } from '../common/Modal'
import { useShortcut } from '../common/Keyboard'
import { KEYBOARD_SHORTCUT_KEYWORD } from './KeyboardShortcuts'
import { Loading } from '../common/Loading'
import styles from './help.scss'

export const SHOW_HELP_SHORTCUT = 'h'
export const SHOW_KEYBOARD_SHORTCUTS_SHORTCUT = '?'

const HelpContent = lazy(() => import('./HelpContent'))

export function Help(): ReactElement {
  const [show, setShow] = useState(false)
  const [initialSearchQuery, setInitialSearchQuery] = useState('')

  useShortcut(SHOW_HELP_SHORTCUT, () => setShow(true))
  useShortcut(SHOW_KEYBOARD_SHORTCUTS_SHORTCUT, () => {
    setInitialSearchQuery(KEYBOARD_SHORTCUT_KEYWORD)
    setShow(true)
  })

  return (
    <Modal
      show={show}
      close={() => {
        setShow(false)
        setInitialSearchQuery('')
      }}
      title="Help"
      className={styles.modal}
    >
      <Suspense
        fallback={
          <Loading isLoading title="Help">
            <div />
          </Loading>
        }
      >
        <HelpContent initialSearchQuery={initialSearchQuery} />
      </Suspense>
    </Modal>
  )
}
