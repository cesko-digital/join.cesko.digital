import styled from 'styled-components'
import checkmark from 'images/checkbox-checkmark.svg'

export const CheckboxWrapper = styled.div`
  display: flex;
  margin-bottom: 40px;
  position: relative;
`

export const CheckboxLabel = styled.label`
  cursor: pointer;
`

export const Input = styled.input<{ isValid?: boolean }>`
  position: absolute;
  left: 0;
  top: 4px;
  width: 24px;
  height: 24px;
  margin: 0;
  border: 0;
  opacity: 0.01;

  & + ${CheckboxLabel} {
    position: relative;
    padding-left: 40px;
    font-size: 20px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.asphalt};

    &:before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 4px;
      width: 24px;
      height: 24px;
      border: 2px solid ${({ theme }) => theme.colors.gravel};
      background-color: ${({ theme }) => theme.colors.white};
      border-radius: ${({ theme }) => theme.borderRadius.base}px;
      user-select: none;
    }
  }

  &:focus + ${CheckboxLabel}:before {
    box-shadow: 0 0 0 4px rgba(0, 39, 0, 0.1);
  }

  &:focus:checked + ${CheckboxLabel}:before {
    box-shadow: 0 0 0 4px rgba(8, 8, 49, 0.12);
  }

  &:checked {
    & + ${CheckboxLabel}:before {
      background-color: ${({ theme }) => theme.colors.it};
      background-image: url(${checkmark});
      background-repeat: no-repeat;
      background-position: center;
      border-color: ${({ theme }) => theme.colors.it};
    }
  }
`
