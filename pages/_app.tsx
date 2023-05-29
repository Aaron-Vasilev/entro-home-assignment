import * as React from 'react'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Provider } from 'react-redux'
import { store } from '../store'
import { Layout } from '../components/Layout'

const theme = extendTheme({
  colors: {
    primary: {
      100: "#DEE5F0",
      200: "#EEF2F8",
      1000: "#0F52BA",
    },
    secondary: {
      50: "#F7F9FC",
      100: "#F0F2F7",
      200: "#DFE3EB",
      500: "#98A2B3",
      600: "#667085",
      700: "#101828",
      1000: "#101828",
    }
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp

