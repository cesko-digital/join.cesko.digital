import styled from 'styled-components'
import { defaultTheme } from 'theme/default'
import { SectionContent } from 'components/layout'
import arrowsBackground from 'images/bg-arrows.svg'

const onboardingTheme = {
  fontSizes: {
    body: 20,
  },
  lineHeights: {
    body: 1.6,
  },
}

// basic typography components
export const H1 = styled.h1`
  margin: 20px 0;
  font-size: ${({ theme }) => theme.fontSizes.xxl}px;
  font-weight: ${({ theme }) => theme.fontWeights.heading};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  color: ${({ theme }) => theme.colors.darkGrey};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.xxxl}px;
  }
`

export const H4 = styled.h4`
  margin: 20px 0;
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  font-weight: ${({ theme }) => theme.fontWeights.heading};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  color: ${({ theme }) => theme.colors.darkGrey};
`

export const BodyBig = styled.p`
  font-size: ${onboardingTheme.fontSizes.body}px;
  line-height: ${({ theme }) => theme.lineHeights.heading};
  color: ${({ theme }) => theme.colors.asphalt};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 23px;
  }
`
export interface BodyProps {
  color?: keyof typeof defaultTheme.colors
}

export const Body = styled.p<BodyProps>`
  font-size: ${onboardingTheme.fontSizes.body}px;
  line-height: ${onboardingTheme.lineHeights.body};
  color: ${({ color = 'asphalt', theme }) => theme.colors[color]};
`

export const Highlighted = styled.span`
  background-color: ${({ theme }) => theme.colors.yellow};
  box-shadow: 0 4px 0 ${({ theme }) => theme.colors.yellow},
    0 -4px 0 ${({ theme }) => theme.colors.yellow};
`

// onboarding page styles
export const SectionIntroductionContent = styled(SectionContent)`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-top: ${({ theme }) => theme.space.lg}px;
    padding-bottom: ${({ theme }) => theme.space.lg}px;
    margin-top: 50px;
    background: url(${arrowsBackground}) calc(80% + 100px) 0% no-repeat,
      url(${arrowsBackground}) 80% calc(0% + 144px) no-repeat;
  }
`

export const IntroductionHeader = styled.div`
  max-width: 768px;
`
