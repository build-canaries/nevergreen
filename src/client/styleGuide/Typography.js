import React, {Component, Fragment} from 'react'
import StyleGuideSection from './StyleGuideSection'
import ExternalLink from '../common/ExternalLink'
import Element from './Element'

class Typography extends Component {
  render() {
    return (
      <Fragment>
        <StyleGuideSection title='Titles'>
          <Element type='h1'>Cupcake toffee jelly beans</Element>
          <Element type='h2'>Cupcake toffee jelly beans</Element>
          <Element type='h3'>Cupcake toffee jelly beans</Element>
          <Element type='h4'>Cupcake toffee jelly beans</Element>
          <Element type='h5'>Cupcake toffee jelly beans</Element>
          <Element type='h6'>Cupcake toffee jelly beans</Element>
        </StyleGuideSection>

        <StyleGuideSection title='Paragraphs'>
          <Element type='p'>
            Tart caramels marzipan chocolate cake cheesecake macaroon. Toffee apple pie dragée sweet roll brownie
            powder. Brownie cookie marzipan. Apple pie ice cream donut dragée. Liquorice icing sesame snaps pie jelly
            bonbon chocolate bar. Bonbon I love pudding gingerbread cake tiramisu I love cupcake I love. Oat cake pastry
            soufflé croissant wafer chupa chups halvah. Ice cream tootsie roll lollipop I love halvah soufflé toffee.
            Jelly beans apple pie halvah.
          </Element>
          <Element type='p'>
            I love cupcake gummi bears marshmallow I love I love I love muffin. Oat cake apple pie sugar plum candy
            canes. Cake I love sweet roll marzipan danish sweet chocolate cake I love. Jelly-o halvah carrot cake cotton
            candy I love pudding chocolate. Dessert I love bonbon marshmallow caramels bear claw I love. Liquorice jelly
            beans tart jujubes dessert pie soufflé. Chocolate bar cupcake liquorice gummies wafer. Cake cake halvah
            biscuit. Toffee ice cream I love wafer dragée sweet roll.
          </Element>
        </StyleGuideSection>

        <StyleGuideSection title='Other semantics elements'>
          <Element type='strong'>
            Cotton candy chocolate bar cotton candy. Pie apple pie jelly apple pie caramels tootsie roll brownie.
            Cheesecake dragée oat cake danish sweet dragée cheesecake icing powder.
          </Element>

          <Element type='em'>
            Candy canes marshmallow I love marshmallow chocolate cake cheesecake I love I love. I love wafer jelly beans
            lollipop sugar plum cupcake. I love halvah powder lemon drops cake pie candy canes chocolate I love. Wafer
            brownie danish caramels jelly-o cotton candy cheesecake chocolate cake.
          </Element>

          <Element type='code'>
            I love topping I love sesame snaps I love soufflé. Soufflé icing dessert danish. Cheesecake I love
            gingerbread I love cookie liquorice chocolate I love marshmallow. Ice cream toffee jelly beans I love
            pudding tart tootsie roll.
          </Element>

          <Element type='pre'>
            Lemon drops lollipop tiramisu croissant chocolate bar bonbon sesame snaps cake lemon drops. Caramels danish
            candy canes. Fruitcake sugar plum icing icing dragée soufflé muffin.
          </Element>

          <kbd><kbd>ctrl</kbd>+<kbd>H</kbd></kbd>
        </StyleGuideSection>

        <StyleGuideSection title='Links'>
          <ExternalLink href='https://github.com/build-canaries/nevergreen'>external link</ExternalLink>
        </StyleGuideSection>
      </Fragment>
    )
  }
}

export default Typography
