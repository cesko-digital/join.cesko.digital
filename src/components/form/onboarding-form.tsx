import React from 'react'
import Strings from '../../../content/onboarding-form.yaml'
import Input from 'components/form/input'
import Checkbox from 'components/form/checkbox'
import { Button } from 'components/buttons'
import SkillTree from 'components/skill-tree'
import OnboardingService, { SkillField } from 'services/onboardingService'
import { FormStatus } from './'
import * as Components from 'components/onboarding/styles'
import * as S from './styles'

export interface OnboardingFormProps {
  skills: SkillField[]
  setFormStatus: (status: FormStatus) => void
  status: FormStatus
}

interface OnboardingFormState {
  name: string
  email: string
  selectedSkills: string[]
  personalData: boolean
  validations: {
    [name: string]: boolean
  }
}

class OnboardingForm extends React.PureComponent<
  OnboardingFormProps,
  OnboardingFormState
> {
  state: OnboardingFormState = {
    name: '',
    email: '',
    selectedSkills: [],
    personalData: false,
    validations: {
      name: true,
      email: true,
      skills: true,
      personalData: true,
    },
  }

  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: e.target.value,
    })
    this.validateName(e.target.value)
  }

  handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: e.target.value,
    })
    this.validateEmail(e.target.value)
  }

  handleSkillChange = async (id: string) => {
    const selected = this.state.selectedSkills.slice()
    const isSelected = selected.indexOf(id) !== -1
    const args: [number, number, string?] = [
      isSelected ? selected.indexOf(id) : selected.length,
      isSelected ? 1 : 0,
    ]
    if (!isSelected) {
      args.push(id)
    }
    Array.prototype.splice.apply(selected, args)
    this.setState(
      {
        selectedSkills: selected,
      },
      async () => await this.validateFieldSkills()
    )
  }

  handlePersonalDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {
        personalData: e.target.checked,
      },
      async () => await this.validatePersonalData()
    )
  }

  async validateName(value: string) {
    this.setState({
      validations: {
        ...this.state.validations,
        name: !!value.trim(),
      },
    })
  }

  async validateEmail(value: string) {
    this.setState({
      validations: {
        ...this.state.validations,
        email: /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
          value.trim()
        ),
      },
    })
  }

  async validateFieldSkills() {
    const onlyFieldSkills = this.props.skills
      .map((field) => (field.details ? field.details.map((s) => s.id) : []))
      .flat()

    const fieldSkillsSelected = onlyFieldSkills.some(
      (id) => this.state.selectedSkills.indexOf(id) !== -1
    )

    this.setState({
      validations: {
        ...this.state.validations,
        skills: fieldSkillsSelected,
      },
    })
  }

  async validatePersonalData() {
    this.setState({
      validations: {
        ...this.state.validations,
        personalData: this.state.personalData !== false,
      },
    })
  }

  async validateForm() {
    await this.validateName(this.state.name)
    await this.validateEmail(this.state.email)
    await this.validateFieldSkills()
    await this.validatePersonalData()

    const { validations } = this.state
    return (
      validations.name &&
      validations.email &&
      validations.skills &&
      validations.personalData
    )
  }

  async sendFormData() {
    this.props.setFormStatus(FormStatus.SUBMIT_PROGRESS)
    try {
      await OnboardingService.submitVolunteer({
        name: this.state.name,
        email: this.state.email,
        skills: this.state.selectedSkills,
      })
      this.props.setFormStatus(FormStatus.SUBMIT_SUCCESS)
    } catch (e) {
      this.props.setFormStatus(FormStatus.SUBMIT_ERROR)
    }
  }

  onFormSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    // run validations on submit
    if (!(await this.validateForm())) return
    this.sendFormData()
  }

  render() {
    const FormValidation = () =>
      !this.state.validations.skills ? (
        <S.FormValidationError>
          Vyberte alespoň jednu dovednost
        </S.FormValidationError>
      ) : null

    return (
      <S.Form onSubmit={this.onFormSubmit}>
        <Components.H4>{Strings.form_heading}</Components.H4>
        <Input
          type="text"
          id="name"
          name="name"
          label={Strings.field_name}
          placeholder="Tomáš Jedno"
          onChange={this.handleNameChange}
          isValid={this.state.validations.name}
          validationMessage={Strings.validation_name}
        />
        <Input
          type="email"
          id="email"
          name="email"
          label={Strings.field_email}
          placeholder="@"
          onChange={this.handleEmailChange}
          isValid={this.state.validations.email}
          validationMessage={Strings.validation_email}
        />
        <Components.H4>{Strings.skills_heading}</Components.H4>
        <Components.Body>{Strings.skills_body}</Components.Body>
        {/* TODO: fetching progress */}
        {/* TODO: form fetching error */}
        <SkillTree
          selected={this.state.selectedSkills}
          skills={this.props.skills}
          handleChange={this.handleSkillChange}
        />
        <FormValidation />
        <S.Footer>
          <Checkbox
            label={Strings.checkbox_confirmation}
            checked={this.state.personalData}
            onChange={this.handlePersonalDataChange}
            isValid={this.state.validations.personalData}
          ></Checkbox>
          <Button type="submit">{Strings.form_submit}</Button>
        </S.Footer>
        {/* TODO: form fetching success */}
      </S.Form>
    )
  }
}

export default OnboardingForm
