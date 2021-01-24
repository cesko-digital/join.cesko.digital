import React from 'react'
import styled from 'styled-components'
import spinner from 'images/spinner.svg'
import { CheckboxWrapper } from 'components/form/checkbox/styles'
import { ValidationMessage } from 'components/form/input/styles'
import SkillTree, { Props as SkillTreeProps } from 'components/skill-tree'

export const Form = styled.form`
  max-width: 670px;
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-top: 32px;
  margin-top: 44px;
  border-top: 2px solid rgba(169, 169, 177, 0.25);

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    align-items: center;

    ${CheckboxWrapper} {
      margin-bottom: 0;
    }
  }
`

export const FormValidationError = styled(ValidationMessage)`
  margin-top: 8px;
`

export const StyledSkillTree = styled(
  ({ fetching, ...props }: SkillTreeProps & { fetching: boolean }) => (
    <SkillTree {...props} />
  )
)`
  position: relative;
  transition: 0.2s all linear;
  max-height: ${({ fetching }) => (fetching ? '80px' : '10000px')};
  min-height: 80px;
  overflow: hidden;

  &:before {
    content: '';
    pointer-events: ${({ fetching }) => (fetching ? 'initial' : 'none')};
    opacity: ${({ fetching }) => (fetching ? '1' : '0')};
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    background: url(${spinner}) no-repeat center;
    z-index: 1;
    transition: 0.2s all;
  }

  &:after {
    content: '';
    pointer-events: ${({ fetching }) => (fetching ? 'initial' : 'none')};
    opacity: ${({ fetching }) => (fetching ? '1' : '0')};
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.base}px;
    background-color: #cbcbcf;
    transition: 0.2s all linear;
  }
`
