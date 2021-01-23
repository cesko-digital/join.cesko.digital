import React from 'react'
import * as S from './styles'

export interface CheckboxProps extends React.HTMLAttributes<HTMLElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  isValid?: boolean
  validationMessage?: string
}

const Checkbox = (props: CheckboxProps) => {
  const isValid = typeof props.isValid !== 'undefined' ? props.isValid : true
  const id = props.id || Math.random().toString(36).substr(2, 7)
  const { label, children, ...forwardedProps } = props

  return (
    <S.CheckboxWrapper className={props.className}>
      <S.Input type="checkbox" {...forwardedProps} id={id} isValid={isValid} />
      <S.CheckboxLabel htmlFor={id}>{label}</S.CheckboxLabel>
      {children}
    </S.CheckboxWrapper>
  )
}

export default Checkbox
