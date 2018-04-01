import React, {Component, Fragment} from 'react'
import Tabs from '../common/tabs/Tabs'
import Container from '../common/container/Container'
import StyleGuideSection from './StyleGuideSection'

class Layout extends Component {
  render() {
    return (
      <Fragment>
        <StyleGuideSection title='Container'>
          <Container title='Title'>
            This is an example container.
          </Container>
        </StyleGuideSection>

        <StyleGuideSection title='Tabs'>
          <Tabs titles={['Red', 'Blue', 'Yellow']}>
            <div style={{backgroundColor: 'red'}}>&nbsp;</div>
            <div style={{backgroundColor: 'blue'}}>&nbsp;</div>
            <div style={{backgroundColor: 'yellow'}}>&nbsp;</div>
          </Tabs>
        </StyleGuideSection>

        <StyleGuideSection title='Table'>
          <table>
            <caption>The table caption</caption>
            <thead>
            <tr>
              <th>Heading 1</th>
              <th>Heading 2</th>
              <th>Heading 3</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Wafer croissant I love wafer powder danish. Liquorice chocolate cake halvah. Macaroon brownie
                macaroon.
              </td>
              <td>Candy canes gummi bears sugar plum dessert tart muffin macaroon. Soufflé cookie I love.</td>
              <td>Marshmallow gummies cotton candy halvah gummies jujubes. Oat cake I love muffin cheesecake I love
                biscuit I love muffin sweet.
              </td>
            </tr>
            <tr>
              <td>Candy canes carrot cake I love. Croissant dessert sugar plum I love bonbon cake tiramisu.</td>
              <td>Cake toffee cotton candy fruitcake apple pie bonbon donut oat cake. Apple pie gummi bears danish
                liquorice.
              </td>
              <td>Sugar plum I love chocolate cake sugar plum cookie chocolate tootsie roll tootsie roll.</td>
            </tr>
            <tr>
              <td>Wafer soufflé ice cream caramels jujubes. Tiramisu bear claw marzipan ice cream. Chocolate cotton
                candy halvah.
              </td>
              <td>Tootsie roll jelly beans oat cake pastry lollipop tootsie roll. Tootsie roll biscuit wafer dragée
                pudding brownie.
              </td>
              <td>Cake lollipop gingerbread jujubes chupa chups. Tootsie roll cake tiramisu. Danish oat cake biscuit.
              </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td>Footer 1</td>
              <td>Footer 2</td>
              <td>Footer 3</td>
            </tr>
            </tfoot>
          </table>
        </StyleGuideSection>
      </Fragment>
    )
  }
}

export default Layout
