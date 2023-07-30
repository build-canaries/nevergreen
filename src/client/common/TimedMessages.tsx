import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import { Timed } from './Timed'
import { Messages, MessagesProps, MessagesType } from './Messages'
import { Warning } from './icons/Warning'
import { Checkmark } from './icons/Checkmark'
import { Info } from './icons/Info'

interface TimedMessagesProps extends MessagesProps {
  readonly onDismiss: () => void
}

function TimedMessages({
  onDismiss,
  messages,
  ...props
}: TimedMessagesProps): ReactElement {
  const [show, setShow] = useState(!isEmpty(messages))

  useEffect(() => {
    setShow(!isEmpty(messages))
  }, [messages])

  return (
    <Timed onTimeout={onDismiss} show={show}>
      <Messages
        {...props}
        onDismiss={() => setShow(false)}
        messages={messages}
      />
    </Timed>
  )
}

export function TimedErrorMessages(
  props: Omit<TimedMessagesProps, 'type' | 'icon'>,
): ReactElement {
  return (
    <TimedMessages type={MessagesType.error} icon={<Warning />} {...props} />
  )
}

export function TimedInfoMessages(
  props: Omit<TimedMessagesProps, 'type' | 'icon'>,
): ReactElement {
  return <TimedMessages type={MessagesType.info} icon={<Info />} {...props} />
}

export function TimedSuccessMessages(
  props: Omit<TimedMessagesProps, 'type' | 'icon'>,
): ReactElement {
  return (
    <TimedMessages
      type={MessagesType.success}
      icon={<Checkmark />}
      {...props}
    />
  )
}
