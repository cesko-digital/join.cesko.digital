import React from 'react'
import { SkillField } from 'services/skillService'
import SkillFieldToggle from './skill-field-toggle'
import * as S from './styles'

export interface Props {
  skills: SkillField[]
  // selectedIDs: string[]
  // onSkillChange: (skill: Skill) => void
}

const SkillTree = (props: Props) => {
  return (
    <S.TreeList>
      {props.skills.map((skillField) => (
        <S.TreeListItem key={skillField.skill}>
          <SkillFieldToggle skillField={skillField} />
        </S.TreeListItem>
      ))}
    </S.TreeList>
  )
}

export default SkillTree
