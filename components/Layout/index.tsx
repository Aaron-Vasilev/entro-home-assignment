import { ReactNode } from 'react'
import { Heading, Flex, Box } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

export function Layout({ children }: Props) {
  return (
    <main>
      <Box
        m="4rem"
      >
        <Heading
          mb="4rem"
        >
          Task Manager
        </Heading>
        <Box
//          w={{ base: "90%", md: "50%" }}
        >
            { children }
        </Box>
      </Box>
    </main>
  )
}

