import React, {Fragment} from 'react'
import {Input} from '../common/forms/Input'
import _ from 'lodash'
import {Checkbox} from '../common/forms/Checkbox'
import {DropDown} from '../common/forms/DropDown'
import {StyleGuideSection} from './StyleGuideSection'
import styles from './style-guide.scss'

const DROP_DOWN_OPTIONS = [
  {value: '1', display: 'option 1'},
  {value: '2', display: 'option 2'},
  {value: '3', display: 'option 3'},
  {value: '4', display: 'option 4'},
  {value: '5', display: 'option 5'}
]

export function Forms() {
  return (
    <Fragment>
      <StyleGuideSection title='Text inputs'>
        <Input placeholder='placeholder'>text</Input>
        <Input readOnly defaultValue='in my restless dreams I see that town'>read only</Input>
        <Input type='password' defaultValue='p4ssw0rd1'>password</Input>
        <Input required placeholder='required'>invalid</Input>

        <Input className={styles.fixedWidth}>fixed width</Input>

        <Input>
          <div className={styles.styledLabel}>styled label</div>
        </Input>
      </StyleGuideSection>

      <StyleGuideSection title='Checkboxes'>
        <Checkbox onToggle={_.noop}>chocolate</Checkbox>
        <Checkbox onToggle={_.noop}>bonbon</Checkbox>
        <Checkbox onToggle={_.noop}>jelly beans</Checkbox>

        <Checkbox className={styles.newLineCheckbox} onToggle={_.noop}>chupa chups</Checkbox>
        <Checkbox className={styles.newLineCheckbox} onToggle={_.noop}>apple pie</Checkbox>
        <Checkbox className={styles.newLineCheckbox} onToggle={_.noop}>marzipan</Checkbox>

        <Checkbox onToggle={_.noop}>
          <div className={styles.styledLabel}>styled label</div>
        </Checkbox>
      </StyleGuideSection>

      <StyleGuideSection title='Drop down'>
        <DropDown options={DROP_DOWN_OPTIONS}>drop down</DropDown>
        <DropDown className={styles.fixedWidth} options={DROP_DOWN_OPTIONS}>fixed width</DropDown>
        <DropDown disabled options={DROP_DOWN_OPTIONS}>disabled</DropDown>
        <DropDown options={DROP_DOWN_OPTIONS}>
          <div className={styles.styledLabel}>styled label</div>
        </DropDown>
      </StyleGuideSection>

      <StyleGuideSection title='Buttons'>
        <button className={styles.primaryButton}>primary button</button>
        <button>default button</button>
        <button className={styles.dangerButton}>danger button</button>
      </StyleGuideSection>
    </Fragment>
  )
}
