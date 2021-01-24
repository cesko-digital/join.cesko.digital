export interface SkillsResponse {
  skills: SkillField[]
}

export interface ErrorResponse {
  code: number
  message: string
}

export interface SkillField {
  skill: string
  details?: Skill[]
  mentor_id?: string
  senior_id?: string
}

export interface Skill {
  id: string
  text: string
}

export interface Volunteer {
  name: string
  email: string
  skills: string[]
}

class OnboardingService {
  static readonly apiBaseUrl: string =
    process.env.GATSBY_API_REGISTRATION_BASE_URL || ''

  static async getSkills(): Promise<SkillsResponse> {
    const fetched = await fetch(`${OnboardingService.apiBaseUrl}/skills`)
    const result = await fetched.json()
    return result
  }

  static getSortedSkills(skills: SkillField[]) {
    return skills
      .map((skill) => {
        if (!skill.details || !skill.details.length) return skill
        skill.details = skill.details
          .slice()
          .sort((a, b) => a.text.localeCompare(b.text, 'cs'))
        return skill
      })
      .sort((a, b) => a.skill.localeCompare(b.skill, 'cs'))
  }

  static async submitVolunteer(volunteer: Volunteer) {
    const post = await fetch(`${OnboardingService.apiBaseUrl}/volunteers`, {
      method: 'POST',
      body: OnboardingService.getVolunteerPayload(volunteer),
      headers: {
        'content-type': 'application/json',
      },
    })
    const result = await post.json()
    return result
  }

  static getVolunteerPayload(volunteer: Volunteer) {
    try {
      return JSON.stringify({
        name: volunteer.name,
        email: volunteer.email,
        options_selected: volunteer.skills,
      })
    } catch (e) {
      throw new Error(`Invalid volunteer data: ${e.message}`)
    }
  }
}

export default OnboardingService
