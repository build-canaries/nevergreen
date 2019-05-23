import React, {ReactNode} from 'react'
import ReactModal from 'react-modal'
import cn from 'classnames'
import styles from './modal.scss'
import {SecondaryButton} from './forms/Button'
import {iCross} from './fonts/Icons'

interface ModalProps {
  title: string;
  show: boolean;
  children: ReactNode;
  close: () => void;
  className?: string;
}

export function Modal({children, title, show, close, className}: ModalProps) {
  return (
    <ReactModal className={cn(styles.modal, className)}
                bodyOpenClassName={styles.modelOpen}
                contentLabel={title}
                isOpen={show}
                onRequestClose={close}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <SecondaryButton onClick={close}
                         icon={iCross}
                         iconOnly>
          close
        </SecondaryButton>
      </div>
      <div className={styles.content}
           data-locator='modal'>
        {children}
      </div>
    </ReactModal>
  )
}
