import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import cn from 'classnames'
import {IconButton} from './IconButton'
import styles from './modal.scss'

export function Modal({children, title, show, close, className}) {
  return (
    <ReactModal className={cn(styles.modal, className)}
                bodyOpenClassName={styles.modelOpen}
                contentLabel={title}
                isOpen={show}
                onRequestClose={close}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <IconButton className={styles.close}
                    onClick={close}
                    icon='cross'
                    label='close'/>
      </div>
      <div className={styles.content}
           data-locator='modal'>
        {children}
      </div>
    </ReactModal>
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  className: PropTypes.string
}
