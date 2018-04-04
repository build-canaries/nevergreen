import React, {Component, Fragment} from 'react'
import Input from '../common/forms/Input'
import Checkbox from '../common/forms/Checkbox'
import _ from 'lodash'
import DropDown from '../common/forms/DropDown'
import buttonStyles from '../common/forms/button.scss'
import styles from './style-guide.scss'
import StyleGuideSection from './StyleGuideSection'

class Forms extends Component {
  render() {
    return (
      <Fragment>
        <StyleGuideSection title='Text inputs'>
          <Input>text</Input>
          <Input readOnly>read only</Input>
          <Input type='password'>password</Input>

          <Input className={styles.fixedWidth}>fixed width</Input>

          <Input>
            <div className={styles.fixedLabel}>labels</div>
          </Input>
          <Input className={styles.fixedWidth}>
            <div className={styles.fixedLabel}>can be aligned</div>
          </Input>
          <Input>
            <div className={styles.fixedLabel}>to improve the visuals</div>
          </Input>
        </StyleGuideSection>

        <StyleGuideSection title='Checkboxes'>
          <Checkbox onToggle={_.noop}>chocolate</Checkbox>
          <Checkbox onToggle={_.noop}>bonbon</Checkbox>
          <Checkbox onToggle={_.noop}>jelly beans</Checkbox>
          <Checkbox onToggle={_.noop}>gingerbread</Checkbox>

          <Checkbox className={styles.newLineCheckbox} onToggle={_.noop}>checkboxes can</Checkbox>
          <Checkbox className={styles.newLineCheckbox} onToggle={_.noop}>be displayed on</Checkbox>
          <Checkbox className={styles.newLineCheckbox} onToggle={_.noop}>new lines via CSS</Checkbox>
        </StyleGuideSection>

        <StyleGuideSection title='Drop down'>
          <DropDown title='drop down'>
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
          </DropDown>
          <DropDown title='fixed width' className={styles.fixedWidth}>
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
          </DropDown>
        </StyleGuideSection>

        <StyleGuideSection title='Buttons'>
          <button className={buttonStyles.primaryButton}>primary button</button>
          <button>default button</button>
          <button className={buttonStyles.dangerButton}>danger button</button>
        </StyleGuideSection>
      </Fragment>
    )
  }
}

export default Forms
