import React, { useState, useEffect } from 'react'
import Form from './onboardingForm'
import SkillService from './skillService'

const OnboardingFormContainer = () => {
  const [skills, setSkills] = useState<any>({})

  // TODO: display error when fetching fails
  useEffect(() => {
    const fetchData = async () => {
      const data = await SkillService.getSkills()
      setSkills(data)
    }
    fetchData()
  }, [])

  return <Form skills={skills} />
}

export default OnboardingFormContainer
