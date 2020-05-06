import React from 'react'
import {Input} from '../common/forms/Input'
import {noop} from 'lodash'
import {Checkbox} from '../common/forms/Checkbox'
import {DropDown} from '../common/forms/DropDown'
import {StyleGuideSection} from './StyleGuideSection'
import styles from './style-guide.scss'
import {DangerButton, PrimaryButton, SecondaryButton} from '../common/forms/Button'
import {iFloppyDisk} from '../common/fonts/Icons'
import {Radio} from '../common/forms/Radio'

const DROP_DOWN_OPTIONS = [
  {value: '1', display: 'option 1'},
  {value: '2', display: 'option 2'},
  {value: '3', display: 'option 3'},
  {value: '4', display: 'option 4'},
  {value: '5', display: 'option 5'}
]

export function Forms() {
  return (
    <>
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

      <StyleGuideSection title='Radio'>
        <Radio onChange={noop} name='sweets'>chocolate</Radio>
        <Radio onChange={noop} name='sweets'>bonbon</Radio>
        <Radio onChange={noop} name='sweets'>jelly beans</Radio>

        <Radio className={styles.newLineCheckbox} onChange={noop} name='sweets2'>chupa chups</Radio>
        <Radio className={styles.newLineCheckbox} onChange={noop} name='sweets2'>apple pie</Radio>
        <Radio className={styles.newLineCheckbox} onChange={noop} name='sweets2'>marzipan</Radio>

        <Radio onChange={noop}>
          <div className={styles.styledLabel}>styled label</div>
        </Radio>
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
        <PrimaryButton icon={iFloppyDisk}>Primary button with icon</PrimaryButton>
        <PrimaryButton icon={iFloppyDisk} iconOnly>Primary button icon only</PrimaryButton>
        <SecondaryButton>Secondary button</SecondaryButton>
        <SecondaryButton icon={iFloppyDisk}>Secondary button with icon</SecondaryButton>
        <SecondaryButton icon={iFloppyDisk} iconOnly>Secondary button icon only</SecondaryButton>
        <DangerButton>danger button</DangerButton>
        <DangerButton icon={iFloppyDisk}>Danger button with icon</DangerButton>
        <DangerButton icon={iFloppyDisk} iconOnly>Danger button icon only</DangerButton>
      </StyleGuideSection>
    </>
  )
}
