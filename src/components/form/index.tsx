import React, { useState, useEffect } from 'react'
import Form from './onboarding-form'
import SkillService, { SkillField } from 'services/skillService'

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
      const data = await SkillService.getSkills()
      setSkills(data.skills)
    }

    try {
      fetchData()
      setStatus(FormStatus.FETCHING_SUCCESS)
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
