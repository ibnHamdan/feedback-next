import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Global, ThemeProvider, css } from "@emotion/react";
import { ProvideAuth } from "@/lib/auth";
import theme from "@/styles/theme";
import SEO from "../next-seo.config";
import { DefaultSeo } from "next-seo";

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
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <ProvideAuth>
        <DefaultSeo {...SEO} />
        <GlobalStyle />

        <Component {...pageProps} />
      </ProvideAuth>
    </ChakraProvider>
  );
};

export default MyApp;
