import React from 'react'
import Strings from '../../../content/onboarding-form.yaml'
import Input from 'components/form/input'
import Checkbox from 'components/form/checkbox'
import { Button } from 'components/buttons'
import * as Onboarding from 'components/onboarding/styles'
import * as S from './styles'

export interface OnboardingFormProps {
  skills?: any
}

interface OnboardingFormState {
  name: string
  email: string
  validations: {
    [name: string]: boolean
  }
}

class OnboardingForm extends React.PureComponent<
  OnboardingFormProps,
  OnboardingFormState
> {
  state = {
    name: '',
    email: '',
    validations: {
      name: true,
      email: true,
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

  onFormSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    // run validations on submit
    await this.validateName(this.state.name)
    await this.validateEmail(this.state.email)
  }

  render() {
    return (
      <S.Form onSubmit={this.onFormSubmit}>
        <Onboarding.H4>{Strings.form_heading}</Onboarding.H4>
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
        <Onboarding.H4>{Strings.skills_heading}</Onboarding.H4>
        <Onboarding.Body>{Strings.skills_body}</Onboarding.Body>
        <S.Footer>
          <Checkbox label={Strings.checkbox_confirmation}></Checkbox>
          <Button type="submit">{Strings.form_submit}</Button>
        </S.Footer>
      </S.Form>
    )
  }
}

export default OnboardingForm
