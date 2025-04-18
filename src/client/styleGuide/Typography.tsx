import type { ReactElement } from 'react'
import { StyleGuideSection } from './StyleGuideSection'
import { ExternalLink } from '../common/ExternalLink'
import { Element } from './Element'
import {
  ErrorMessages,
  InfoMessages,
  SuccessMessages,
  WarningMessages,
} from '../common/Messages'
import { LinkButton } from '../common/LinkButton'
import { FloppyDisk } from '../common/icons/FloppyDisk'
import {
  TimedErrorMessages,
  TimedInfoMessages,
  TimedSuccessMessages,
} from '../common/TimedMessages'
import noop from 'lodash/noop'

const TITLE = 'Cupcake toffee jelly beans'

const MESSAGES = [
  'Chocolate bar tart jelly-o ice cream jelly pastry pastry candy pudding',
  'Sweet roll cookie chocolate cake gingerbread marshmallow jelly beans',
  'Sweet roll tart cake chupa chups soufflé wafer tiramisu chupa chups toffee',
]

export function Typography(): ReactElement {
  return (
    <>
      <StyleGuideSection title="Titles">
        <Element type="h1">{TITLE}</Element>
        <Element type="h2">{TITLE}</Element>
        <Element type="h3">{TITLE}</Element>
        <Element type="h4">{TITLE}</Element>
        <Element type="h5">{TITLE}</Element>
        <Element type="h6">{TITLE}</Element>
      </StyleGuideSection>

      <StyleGuideSection title="Paragraphs">
        <Element type="p">
          Tart caramels marzipan chocolate cake cheesecake macaroon. Toffee
          apple pie dragée sweet roll brownie powder. Brownie cookie marzipan.
          Apple pie ice cream donut dragée. Liquorice icing sesame snaps pie
          jelly bonbon chocolate bar. Bonbon I love pudding gingerbread cake
          tiramisu I love cupcake I love. Oat cake pastry soufflé croissant
          wafer chupa chups halvah. Ice cream tootsie roll lollipop I love
          halvah soufflé toffee. Jelly beans apple pie halvah.
        </Element>
        <Element type="p">
          I love cupcake gummi bears marshmallow I love I love I love muffin.
          Oat cake apple pie sugar plum candy canes. Cake I love sweet roll
          marzipan danish sweet chocolate cake I love. Jelly-o halvah carrot
          cake cotton candy I love pudding chocolate. Dessert I love bonbon
          marshmallow caramels bear claw I love. Liquorice jelly beans tart
          jujubes dessert pie soufflé. Chocolate bar cupcake liquorice gummies
          wafer. Cake cake halvah biscuit. Toffee ice cream I love wafer dragée
          sweet roll.
        </Element>
      </StyleGuideSection>

      <StyleGuideSection title="Other semantics elements">
        <Element type="strong">
          Cotton candy chocolate bar cotton candy. Pie apple pie jelly apple pie
          caramels tootsie roll brownie. Cheesecake dragée oat cake danish sweet
          dragée cheesecake icing powder.
        </Element>

        <Element type="em">
          Candy canes marshmallow I love marshmallow chocolate cake cheesecake I
          love I love. I love wafer jelly beans lollipop sugar plum cupcake. I
          love halvah powder lemon drops cake pie candy canes chocolate I love.
          Wafer brownie danish caramels jelly-o cotton candy cheesecake
          chocolate cake.
        </Element>

        <Element type="code">
          I love topping I love sesame snaps I love soufflé. Soufflé icing
          dessert danish. Cheesecake I love gingerbread I love cookie liquorice
          chocolate I love marshmallow. Ice cream toffee jelly beans I love
          pudding tart tootsie roll.
        </Element>

        <kbd>
          <kbd>ctrl</kbd>+<kbd>H</kbd>
        </kbd>
      </StyleGuideSection>

      <StyleGuideSection title="Links">
        <ExternalLink href="https://github.com/build-canaries/nevergreen">
          External link
        </ExternalLink>
        <LinkButton to="/style-guide">Link button</LinkButton>
        <LinkButton to="/style-guide" icon={<FloppyDisk />}>
          Link button with icon
        </LinkButton>
      </StyleGuideSection>

      <StyleGuideSection title="Messages">
        <InfoMessages messages={['info messages', ...MESSAGES]} />
        <InfoMessages
          messages={['info messages', ...MESSAGES]}
          onDismiss={() => {
            alert('Dismissed')
          }}
        />
        <InfoMessages messages="Chocolate bar tart jelly-o ice cream jelly pastry pastry candy pudding" />
        <InfoMessages
          messages="Chocolate bar tart jelly-o ice cream jelly pastry pastry candy pudding"
          onDismiss={() => {
            alert('Dismissed')
          }}
        />
        <SuccessMessages messages={['success messages', ...MESSAGES]} />
        <SuccessMessages
          messages={['success messages', ...MESSAGES]}
          onDismiss={() => {
            alert('Dismissed')
          }}
        />
        <SuccessMessages messages="Chocolate bar tart jelly-o ice cream jelly pastry pastry candy pudding" />
        <SuccessMessages
          messages="Chocolate bar tart jelly-o ice cream jelly pastry pastry candy pudding"
          onDismiss={() => {
            alert('Dismissed')
          }}
        />
        <ErrorMessages messages={['error messages', ...MESSAGES]} />
        <ErrorMessages
          messages={['error messages', ...MESSAGES]}
          onDismiss={() => {
            alert('Dismissed')
          }}
        />
        <ErrorMessages messages="Chocolate bar tart jelly-o ice cream jelly pastry pastry candy pudding" />
        <ErrorMessages
          messages="Chocolate bar tart jelly-o ice cream jelly pastry pastry candy pudding"
          onDismiss={() => {
            alert('Dismissed')
          }}
        />
        <WarningMessages messages={['warning messages', ...MESSAGES]} />
        <WarningMessages
          messages={['warning messages', ...MESSAGES]}
          onDismiss={() => {
            alert('Dismissed')
          }}
        />
        <WarningMessages messages="Chocolate bar tart jelly-o ice cream jelly pastry pastry candy pudding" />
        <WarningMessages
          messages="Chocolate bar tart jelly-o ice cream jelly pastry pastry candy pudding"
          onDismiss={() => {
            alert('Dismissed')
          }}
        />
      </StyleGuideSection>

      <StyleGuideSection title="Timed messages">
        <TimedInfoMessages
          onDismiss={noop}
          messages="Chocolate bar tart jelly-o ice cream jelly pastry pastry candy pudding"
        />
        <TimedSuccessMessages
          onDismiss={noop}
          messages="Chocolate bar tart jelly-o ice cream jelly pastry pastry candy pudding"
        />
        <TimedErrorMessages
          onDismiss={noop}
          messages="Chocolate bar tart jelly-o ice cream jelly pastry pastry candy pudding"
        />
      </StyleGuideSection>
    </>
  )
}
