import React, { ReactNode } from 'react'

import Head from 'components/head'
import Header from './header'
import * as S from 'components/layout/styles'

export interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <S.Container>
      <Head />
      <Header />
      <main>{children}</main>
    </S.Container>
  )
}

export default Layout
