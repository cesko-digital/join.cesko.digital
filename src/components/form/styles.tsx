import styled from 'styled-components'
import { CheckboxWrapper } from 'components/form/checkbox/styles'

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
