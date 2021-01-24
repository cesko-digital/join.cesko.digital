import React from 'react'
import { SkillField } from 'services/skillService'
import SkillFieldToggle from './skill-field-toggle'
import * as S from './styles'

export interface Props {
  selected: string[]
  skills: SkillField[]
  handleChange: (id: string) => void
}

const SkillTree = (props: Props) => {
  return (
    <S.TreeList>
      {props.skills.map((skillField) => (
        <S.TreeListItem key={skillField.skill}>
          <SkillFieldToggle
            skillField={skillField}
            selected={props.selected}
            handleChange={props.handleChange}
          />
        </S.TreeListItem>
      ))}
    </S.TreeList>
  )
}

export default SkillTree
