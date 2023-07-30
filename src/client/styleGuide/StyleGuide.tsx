import type { ReactElement } from 'react'
import { useEffect } from 'react'
import { Typography } from './Typography'
import { Forms } from './Forms'
import { Layout } from './Layout'
import { Icons } from './Icons'
import { Page } from '../common/Page'
import { useNevergreenContext } from '../Nevergreen'

export function StyleGuide(): ReactElement {
  const { setBannerMessage } = useNevergreenContext()
  useEffect(() => {
    setBannerMessage(
      'Sweet roll cookie chocolate cake gingerbread marshmallow jelly beans',
    )
    return () => {
      setBannerMessage('')
    }
  }, [setBannerMessage])

  return (
    <Page title="Style guide">
      <Typography />
      <Forms />
      <Layout />
      <Icons />
    </Page>
  )
}
