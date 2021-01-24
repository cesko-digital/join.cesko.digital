import React, { useState, useEffect } from 'react'
import Form from './onboarding-form'
import OnboardingService, { SkillField } from 'services/onboardingService'

export enum FormStatus {
  FETCHING_PROGRESS = 'fetching-progress',
  FETCHING_SUCCESS = 'fetching-success',
  FETCHING_ERROR = 'fecthing-error',
  SUBMIT_PROGRESS = 'submit-progress',
  SUBMIT_SUCCESS = 'submit-success',
  SUBMIT_ERROR = 'submit-error',
}

const OnboardingFormContainer = () => {
  const [skills, setSkills] = useState<SkillField[]>([])
  const [status, setStatus] = useState<FormStatus>(FormStatus.FETCHING_PROGRESS)

  useEffect(() => {
    const fetchData = async () => {
      const data = await OnboardingService.getSkills()
      setSkills(OnboardingService.getSortedSkills(data.skills))
      setStatus(FormStatus.FETCHING_SUCCESS)
    }

    try {
      fetchData()
    } catch (e) {
      setStatus(FormStatus.FETCHING_ERROR)
    } finally {
    }
  }, [])

  const setFormStatus = (status: FormStatus) => {
    setStatus(status)
  }

  return <Form skills={skills} status={status} setFormStatus={setFormStatus} />
}

export default OnboardingFormContainer
