import React, { useContext } from 'react'
import { Layout, Section, SectionContent } from 'components/layout'
import { ThemeContext } from 'styled-components'
import Strings from '../../content/onboarding-intro.yaml'
import OnboardingForm from 'components/form'
import * as S from 'components/onboarding/styles'

const IndexPage: React.FC = () => {
  const theme = useContext(ThemeContext)

  return (
    <Layout>
      <Section>
        <S.SectionIntroductionContent>
          <S.IntroductionHeader>
            <S.H1>{Strings.heading}</S.H1>
            <S.BodyBig>{Strings.perex}</S.BodyBig>
            <S.Body color={'darkGrey'}>
              <S.Highlighted>{Strings.highlighted}</S.Highlighted>{' '}
              {Strings.body}
            </S.Body>
            <S.Body color={'darkGrey'}>{Strings.nextSteps}</S.Body>
          </S.IntroductionHeader>
        </S.SectionIntroductionContent>
      </Section>

      <Section backgroundColor={theme.colors.pebble}>
        <SectionContent verticalPadding={40}>
          <OnboardingForm />
        </SectionContent>
      </Section>
    </Layout>
  )
}

export default IndexPage
