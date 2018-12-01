import React, {Fragment} from 'react'
import {ExternalLink} from '../common/ExternalLink'

export function SuccessHelp() {
  return (
    <Fragment>
      <p>
        You can add text messages or any <ExternalLink
        href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Supported_image_formats'>valid image
        URLs</ExternalLink>, these will get displayed when no projects are broken or building on the monitor
        page. Images are previewed in a 16:9 ratio which is how they would look on a full HD TV (1920x1080).
      </p>
      <p>Need some inspiration?</p>
      <p>
        Try searching for some <ExternalLink href='https://duckduckgo.com/?q=nature+1920x1080&iax=1&ia=images'>nice
        images</ExternalLink> or checkout <ExternalLink href='http://www.disapprovallook.com/'>Disapproval
        Look</ExternalLink> for some fun messages, like jelly guy! <span style={{whiteSpace: 'nowrap'}}>༼ つ◕_◕ ༽つ</span>
      </p>
    </Fragment>
  )
}
