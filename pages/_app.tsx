import * as React from 'react'
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from 'react-redux'
import { store } from '../store'
//import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp

