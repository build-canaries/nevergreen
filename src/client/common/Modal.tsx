import React, { ReactElement, ReactNode } from 'react'
import ReactModal from 'react-modal'
import cn from 'classnames'
import styles from './modal.scss'
import { SecondaryButton } from './forms/Button'
import { pauseShortcuts, unpauseShortcuts } from './Keyboard'
import { Cross } from './icons/Cross'

interface ModalProps {
  readonly title: string
  readonly show: boolean
  readonly children: ReactNode
  readonly close: () => void
  readonly className?: string
  readonly shouldCloseOnEsc?: boolean
  readonly shouldCloseOnOverlayClick?: boolean
}

export function Modal({
  children,
  title,
  show,
  close,
  className,
  shouldCloseOnEsc,
  shouldCloseOnOverlayClick,
}: ModalProps): ReactElement {
  return (
    <ReactModal
      className={cn(styles.modal, className)}
      bodyOpenClassName={styles.modelOpen}
      overlayClassName={styles.overlay}
      contentLabel={title}
      isOpen={show}
      onAfterOpen={pauseShortcuts}
      onAfterClose={unpauseShortcuts}
      onRequestClose={close}
      shouldCloseOnEsc={shouldCloseOnEsc}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <SecondaryButton onClick={close} icon={<Cross />} iconOnly>
          Close
        </SecondaryButton>
      </div>
      <div className={styles.content} data-locator="modal">
        {children}
      </div>
    </ReactModal>
  )
}
