import type { ReactElement } from 'react'
import { Input } from '../common/forms/Input'
import noop from 'lodash/noop'
import { Checkbox } from '../common/forms/Checkbox'
import { DropDown } from '../common/forms/DropDown'
import { StyleGuideSection } from './StyleGuideSection'
import {
  DangerButton,
  PrimaryButton,
  SecondaryButton,
} from '../common/forms/Button'
import { Password } from '../common/forms/Password'
import { FloppyDisk } from '../common/icons/FloppyDisk'
import { ColourPicker } from '../common/forms/ColourPicker'
import { Slider } from '../common/forms/Slider'
import { Form } from '../common/forms/Form'
import styles from './forms.scss'

const DROP_DOWN_OPTIONS = [
  { value: '1', display: 'option 1' },
  { value: '2', display: 'option 2' },
  { value: '3', display: 'option 3' },
  { value: '4', display: 'option 4' },
  { value: '5', display: 'option 5' },
]

export function Forms(): ReactElement {
  return (
    <>
      <StyleGuideSection title="Form">
        <Form onSuccess={noop} onCancel={noop}>
          {() => <Input>example input</Input>}
        </Form>
      </StyleGuideSection>

      <StyleGuideSection title="Text inputs">
        <Input placeholder="this is a placeholder">Placeholder example</Input>
        <Input readOnly defaultValue="in my restless dreams I see that town">
          Read only example
        </Input>
        <Input error="some validation error">Error message example</Input>
        <Password>Password example</Password>
        <Password error="some validation error">
          Password with error message example
        </Password>
        <Input classNameContainer={styles.fixedWidth}>fixed width</Input>
        <Input classNameLabel={styles.styledLabel}>styled label</Input>
      </StyleGuideSection>

      <StyleGuideSection title="Checkboxes">
        <Checkbox onToggle={noop}>chocolate</Checkbox>
        <Checkbox onToggle={noop}>bonbon</Checkbox>
        <Checkbox onToggle={noop} disabled>
          disabled
        </Checkbox>
        <Checkbox onToggle={noop}>
          <div className={styles.styledLabel}>styled label</div>
        </Checkbox>
      </StyleGuideSection>

      <StyleGuideSection title="Drop down">
        <DropDown options={DROP_DOWN_OPTIONS}>drop down</DropDown>
        <DropDown className={styles.fixedWidth} options={DROP_DOWN_OPTIONS}>
          fixed width
        </DropDown>
        <DropDown disabled options={DROP_DOWN_OPTIONS}>
          disabled
        </DropDown>
        <DropDown options={DROP_DOWN_OPTIONS}>
          <div className={styles.styledLabel}>styled label</div>
        </DropDown>
      </StyleGuideSection>

      <StyleGuideSection title="Colour picker">
        <ColourPicker>colour picker</ColourPicker>
        <ColourPicker disabled>disabled</ColourPicker>
      </StyleGuideSection>

      <StyleGuideSection title="Slider">
        <Slider>slider</Slider>
        <Slider classNameContainer={styles.fixedWidth}>fixed width</Slider>
        <Slider disabled>disabled</Slider>
        <Slider classNameLabel={styles.styledLabel}>styled label</Slider>
      </StyleGuideSection>

      <StyleGuideSection title="Buttons">
        <PrimaryButton>Primary button</PrimaryButton>
        <PrimaryButton icon={<FloppyDisk />}>
          Primary button with icon
        </PrimaryButton>
        <PrimaryButton icon={<FloppyDisk />} iconOnly>
          Primary button icon only
        </PrimaryButton>
        <SecondaryButton>Secondary button</SecondaryButton>
        <SecondaryButton icon={<FloppyDisk />}>
          Secondary button with icon
        </SecondaryButton>
        <SecondaryButton icon={<FloppyDisk />} iconOnly>
          Secondary button icon only
        </SecondaryButton>
        <DangerButton>Danger button</DangerButton>
        <DangerButton icon={<FloppyDisk />}>
          Danger button with icon
        </DangerButton>
        <DangerButton icon={<FloppyDisk />} iconOnly>
          Danger button icon only
        </DangerButton>
      </StyleGuideSection>
    </>
  )
}
