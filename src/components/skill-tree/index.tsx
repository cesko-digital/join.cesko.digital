import React from 'react'
import { SkillField } from 'services/onboardingService'
import SkillFieldToggle from './skill-field-toggle'
import { Spinner } from 'components/onboarding/styles'
import * as S from './styles'

export interface Props extends React.HTMLAttributes<HTMLUListElement> {
  selected: string[]
  skills: SkillField[]
  handleChange: (id: string) => void
  fetching: boolean
}

const SkillTree = (props: Props) => {
  return (
    <S.TreeList className={props.className}>
      {props.fetching && (
        <li>
          <Spinner background="#cbcbcf" />
        </li>
      )}
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
