import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './button.scss'
import iconStyles from '../fonts/icon-font.scss'
import {VisuallyHidden} from '../VisuallyHidden'

function BaseButton({style, className, icon, iconOnly, children, ...additionalProps}) {
  const classes = cn(styles[style], className, {
    [iconStyles[`icon-${icon}`]]: icon,
    [styles.withIcon]: icon && !iconOnly,
    [styles.iconOnly]: icon && iconOnly
  })

  return (
    <button className={classes}
            title={iconOnly ? children : null}
            {...additionalProps}>
      {iconOnly && <VisuallyHidden>{children}</VisuallyHidden>}
      {!iconOnly && children}
    </button>
  )
}

BaseButton.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOf(['primary', 'secondary', 'danger']).isRequired,
  className: PropTypes.string,
  icon: PropTypes.string,
  iconOnly: PropTypes.bool
}

export function PrimaryButton(props) {
  return <BaseButton style='primary' {...props}/>
}

export function SecondaryButton(props) {
  return <BaseButton style='secondary' {...props}/>
}

export function DangerButton(props) {
  return <BaseButton style='danger' {...props}/>
}

export function InputButton(props) {
  return <SecondaryButton iconOnly className={styles.inputButton} {...props}/>
}
