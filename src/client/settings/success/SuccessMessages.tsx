import React, {ReactElement, ReactNode} from 'react'
import {Container} from '../../common/Container'
import {RemoveButton} from './RemoveButton'
import {hasScheme} from '../../domain/Url'
import {SuccessMessage} from '../../common/SuccessMessage'
import {AddMessage} from './AddMessage'
import {useDispatch, useSelector} from 'react-redux'
import {getSuccessMessages} from './SuccessReducer'
import {removeMessage} from './SuccessActionCreators'
import styles from './success-messages.scss'

function AspectRatio({children}: { children: ReactNode }): ReactElement {
  return (
    <li className={styles.messageItem}>
      <div className={styles.messageWrapper}>
        {children}
      </div>
    </li>
  )
}

export function SuccessMessages(): ReactElement {
  const dispatch = useDispatch()
  const messages = useSelector(getSuccessMessages)

  return (
    <Container title='Success messages'>
      <ol className={styles.messages}>
        {
          messages.map((msg) => {
            return (
              <AspectRatio key={msg}>
                {hasScheme(msg) ? (
                  <img className={styles.message}
                       src={msg}
                       alt={msg}
                       title={msg}
                       data-locator='success-image'/>
                ) : (
                  <div className={styles.message}>
                    <SuccessMessage message={msg}/>
                  </div>
                )}
                <RemoveButton removeMessage={() => dispatch(removeMessage(msg))}/>
              </AspectRatio>
            )
          })
        }
        <li className={styles.add}>
          <AddMessage/>
        </li>
      </ol>
    </Container>
  )
}
