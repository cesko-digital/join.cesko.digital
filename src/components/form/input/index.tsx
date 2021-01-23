import * as React from 'react'
import * as S from './styles'

export interface InputProps extends React.HTMLAttributes<HTMLElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  isValid?: boolean
  validationMessage?: string
}

const Input = (props: InputProps) => {
  const isValid = typeof props.isValid !== 'undefined' ? props.isValid : true
  const { label, children, ...forwardedProps } = props

  return (
    <S.InputWrapper>
      <S.InputLabel>{label}</S.InputLabel>
      <S.StyledInput {...forwardedProps} isValid={isValid} />
      {props.isValid === false && (
        <S.ValidationMessage>{props.validationMessage}</S.ValidationMessage>
      )}
    </S.InputWrapper>
  )
}

export default Input
