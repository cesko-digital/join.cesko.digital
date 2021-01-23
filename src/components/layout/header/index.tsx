import React from 'react'
import styled from 'styled-components'
import Section from 'components/layout/section'
import GatsbyLink from 'gatsby-link'
import mediumLogo from 'images/logo-medium.svg'
import mobileLogo from 'images/logo-mobile.svg'

import * as S from 'components/layout/header/styles'
import { SectionContent } from 'cesko-digital-web/src/components/layout'

const StyledSectionContent = styled(SectionContent)`
  border-bottom: 2px solid ${({ theme }) => theme.colors.pebble};

  ${S.Container} {
    height: 50px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${S.Container} {
      height: 100px;
    }
  }
`

const MediumLogo = styled.div`
  background-image: url(${mediumLogo});
  width: 243px;
  height: 48px;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    background-image: url(${mobileLogo});
    background-repeat: no-repeat;
    background-size: contain;
    width: 32px;
  }
`

const Header: React.FC = () => {
  return (
    <Section as={'header'}>
      <StyledSectionContent>
        <S.Container>
          <GatsbyLink to="/">
            <MediumLogo />
          </GatsbyLink>
        </S.Container>
      </StyledSectionContent>
    </Section>
  )
}

export default Header
