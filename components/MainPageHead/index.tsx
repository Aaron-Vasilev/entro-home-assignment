import { Flex, Heading } from '@chakra-ui/react'
import { Button } from "../Button"

interface Props {
  setCreation: Function
  creation: boolean
}

export function Header({ setCreation, creation }: Props) {
  return (
    <Flex
      gap="20px"
      align="center"
    >
      <Heading
        fontSize="22"
      >
        Tasks
      </Heading>
      { creation ? 
        <Button
          value="Cancel"
          handler={() => setCreation(false)}
          type="secondary"
        />
        : 
        <Button
          value="New task"
          handler={() => setCreation(true)}
          type="secondary"
        />
      }
    </Flex>
  )
}
