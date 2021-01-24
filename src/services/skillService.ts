export interface SkillServiceResponse {
  skills: SkillField[]
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
class SkillService {
  static readonly apiBaseUrl: string =
    process.env.GATSBY_API_REGISTRATION_BASE_URL || ''

  static async getSkills(): Promise<SkillServiceResponse> {
    const fetched = await fetch(`${SkillService.apiBaseUrl}/skills`)
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
}

export default SkillService
