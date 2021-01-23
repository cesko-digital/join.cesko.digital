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
}

export default SkillService
