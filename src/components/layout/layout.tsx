import React, { ReactNode } from 'react'

import Head from 'components/head'
import Header from './header'
import * as S from 'components/layout/styles'

const Layout: React.FC = ({ children }) => {
  return (
    <S.Container>
      <Head />
      <Header />
      <main>{children}</main>
    </S.Container>
  )
}

export default Layout
