class SkillService {
  static readonly apiBaseUrl: string =
    process.env.GATSBY_API_REGISTRATION_BASE_URL || ''

  static async getSkills() {
    const fetched = await fetch(`${SkillService.apiBaseUrl}/skills`)
    const result = await fetched.json()
    return result
  }
}

export default SkillService
