import React, {ReactElement} from 'react'
import {Input} from '../common/forms/Input'
import noop from 'lodash/noop'
import {Checkbox} from '../common/forms/Checkbox'
import {DropDown} from '../common/forms/DropDown'
import {StyleGuideSection} from './StyleGuideSection'
import styles from './style-guide.scss'
import {DangerButton, PrimaryButton, SecondaryButton} from '../common/forms/Button'
import {Password} from '../common/forms/Password'
import {FloppyDisk} from '../common/icons/FloppyDisk'

const DROP_DOWN_OPTIONS = [
  {value: '1', display: 'option 1'},
  {value: '2', display: 'option 2'},
  {value: '3', display: 'option 3'},
  {value: '4', display: 'option 4'},
  {value: '5', display: 'option 5'}
]

export function Forms(): ReactElement {
  return (
    <>
      <StyleGuideSection title='Text inputs'>
        <Input placeholder='this is a placeholder'>Placeholder example</Input>
        <Input readOnly defaultValue='in my restless dreams I see that town'>Read only example</Input>
        <Input error='some validation error'>
          Error message example
        </Input>
        <Password>Password example</Password>
        <Password error='some validation error'>Password
          with error message example
        </Password>

        <Input className={styles.fixedWidth}>fixed width</Input>

        <Input>
          <div className={styles.styledLabel}>styled label</div>
        </Input>
      </StyleGuideSection>

      <StyleGuideSection title='Checkboxes'>
        <Checkbox onToggle={noop}>chocolate</Checkbox>
        <Checkbox onToggle={noop}>bonbon</Checkbox>
        <Checkbox onToggle={noop}>jelly beans</Checkbox>

        <Checkbox className={styles.newLineCheckbox} onToggle={noop}>chupa chups</Checkbox>
        <Checkbox className={styles.newLineCheckbox} onToggle={noop}>apple pie</Checkbox>
        <Checkbox className={styles.newLineCheckbox} onToggle={noop}>marzipan</Checkbox>

        <Checkbox onToggle={noop}>
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
        <PrimaryButton>Primary button</PrimaryButton>
        <PrimaryButton icon={<FloppyDisk/>}>Primary button with icon</PrimaryButton>
        <PrimaryButton icon={<FloppyDisk/>} iconOnly>Primary button icon only</PrimaryButton>
        <SecondaryButton>Secondary button</SecondaryButton>
        <SecondaryButton icon={<FloppyDisk/>}>Secondary button with icon</SecondaryButton>
        <SecondaryButton icon={<FloppyDisk/>} iconOnly>Secondary button icon only</SecondaryButton>
        <DangerButton>Danger button</DangerButton>
        <DangerButton icon={<FloppyDisk/>}>Danger button with icon</DangerButton>
        <DangerButton icon={<FloppyDisk/>} iconOnly>Danger button icon only</DangerButton>
      </StyleGuideSection>
    </>
  )
}
