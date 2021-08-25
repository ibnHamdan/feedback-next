import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { Global, ThemeProvider, css } from '@emotion/react'
import { ProvideAuth } from '@/lib/auth'
import theme from '@/styles/theme'

const GlobalStyle = ({ children }) => {


  return (
    <>
    <CSSReset />
    <Global 
      styles={css`
      html {
        min-width: 360px;
        scroll-behavior: smooth;
      }

      #__next {
        display: flex;
        flex-direction: column;
        min-hight: 100vh;
      }
    `}
    />
    {children}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ProvideAuth>
        <GlobalStyle />
        
        <Component {...pageProps} />
        </ProvideAuth>
    </ChakraProvider>
    )
}

export default MyApp
