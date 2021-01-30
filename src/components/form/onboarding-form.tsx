import React, { useContext, useState, useEffect, useRef } from 'react'
import Strings from '../../../content/onboarding-form.yaml'
import Input from 'components/form/input'
import Checkbox from 'components/form/checkbox'
import { Button } from 'components/buttons'
import OnboardingService, { SkillField } from 'services/onboardingService'
import { FormStatus, FormContext } from './'
import * as Components from 'components/onboarding/styles'
import * as S from './styles'

export interface OnboardingFormProps {
  skills: SkillField[]
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

const OnboardingForm = (props: OnboardingFormProps) => {
  const [state, setState] = useState<OnboardingFormState>({
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
  })

  const usePrevious = (state: OnboardingFormState) => {
    const ref = useRef(state)
    useEffect(() => {
      ;(ref.current as unknown) = state
    }, [state])
    return ref.current as never
  }

  const { status, setStatus } = useContext(FormContext)
  const previousState: OnboardingFormState = usePrevious(state)

  // validate skills, personal data after change
  useEffect(() => {
    const validateCheckbox = async () => await validatePersonalData()
    const validateSkills = async () => await validateFieldSkills()
    if (previousState.personalData !== state.personalData) {
      validateCheckbox()
    }
    if (previousState.selectedSkills.length !== state.selectedSkills.length) {
      validateSkills()
    }
  }, [state])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setState((prev) => ({
      ...prev,
      name: value,
    }))
    validateName(value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setState((prev) => ({
      ...prev,
      email: value,
    }))
    validateEmail(value)
  }

  const handleSkillChange = async (id: string) => {
    const selected = state.selectedSkills.slice()
    const isSelected = selected.indexOf(id) !== -1
    const args: [number, number, string?] = [
      isSelected ? selected.indexOf(id) : selected.length,
      isSelected ? 1 : 0,
    ]
    if (!isSelected) {
      args.push(id)
    }
    Array.prototype.splice.apply(selected, args)
    setState((prev) => ({
      ...prev,
      selectedSkills: selected,
    }))
  }

  const handlePersonalDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setState((prev) => ({
      ...prev,
      personalData: checked,
    }))
  }

  const validateName = async (value: string) => {
    setState((prev) => ({
      ...prev,
      validations: {
        ...prev.validations,
        name: !!value.trim(),
      },
    }))
  }

  const validateEmail = async (value: string) => {
    setState((prev) => ({
      ...prev,
      validations: {
        ...prev.validations,
        email: /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
          value.trim()
        ),
      },
    }))
  }

  const validateFieldSkills = async () => {
    const onlyFieldSkills = props.skills
      .map((field) => (field.details ? field.details.map((s) => s.id) : []))
      .flat()

    const fieldSkillsSelected = onlyFieldSkills.some(
      (id) => state.selectedSkills.indexOf(id) !== -1
    )

    setState((prev) => ({
      ...prev,
      validations: {
        ...prev.validations,
        skills: fieldSkillsSelected,
      },
    }))
  }

  const validatePersonalData = () => {
    setState((prev) => ({
      ...prev,
      validations: {
        ...prev.validations,
        personalData: prev.personalData !== false,
      },
    }))
  }

  const validateForm = async () => {
    await validateName(state.name)
    await validateEmail(state.email)
    await validateFieldSkills()
    await validatePersonalData()

    const { validations } = state
    return (
      validations.name &&
      validations.email &&
      validations.skills &&
      validations.personalData
    )
  }

  const sendFormData = async () => {
    setStatus(FormStatus.SUBMIT_PROGRESS)
    try {
      await OnboardingService.submitVolunteer({
        name: state.name,
        email: state.email,
        skills: state.selectedSkills,
      })
      setStatus(FormStatus.SUBMIT_SUCCESS)
    } catch (e) {
      setStatus(FormStatus.SUBMIT_ERROR)
    }
  }

  const onFormSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    // run validations on submit
    if (!(await validateForm())) return
    sendFormData()
  }

  const FormValidation = () =>
    !state.validations.skills ? (
      <S.FormValidationError>
        Vyberte alespoň jednu dovednost
      </S.FormValidationError>
    ) : null

  return (
    <S.Form onSubmit={onFormSubmit}>
      <Components.H4>{Strings.form_heading}</Components.H4>
      <Input
        type="text"
        id="name"
        name="name"
        label={Strings.field_name}
        placeholder="Tomáš Jedno"
        onChange={handleNameChange}
        isValid={state.validations.name}
        validationMessage={Strings.validation_name}
        disabled={status === FormStatus.SUBMIT_PROGRESS}
      />
      <Input
        type="email"
        id="email"
        name="email"
        label={Strings.field_email}
        placeholder="@"
        onChange={handleEmailChange}
        isValid={state.validations.email}
        validationMessage={Strings.validation_email}
        disabled={status === FormStatus.SUBMIT_PROGRESS}
      />
      <Components.H4>{Strings.skills_heading}</Components.H4>
      <Components.Body>{Strings.skills_body}</Components.Body>
      {/* TODO: form fetching error */}
      <S.StyledSkillTree
        selected={state.selectedSkills}
        skills={props.skills}
        handleChange={handleSkillChange}
        fetching={status === FormStatus.FETCHING_PROGRESS}
      />
      <FormValidation />
      <S.Footer>
        <Checkbox
          label={Strings.checkbox_confirmation}
          checked={state.personalData}
          onChange={handlePersonalDataChange}
          isValid={state.validations.personalData}
          disabled={status === FormStatus.SUBMIT_PROGRESS}
        ></Checkbox>
        <Button type="submit" disabled={status === FormStatus.SUBMIT_PROGRESS}>
          {Strings.form_submit}
        </Button>
      </S.Footer>
      {/* TODO: form fetching success */}
    </S.Form>
  )
}

export default OnboardingForm
