import { useEffect, useState } from "react"
import { Button as ChakraButton } from "@chakra-ui/react"
interface Props {
  value: string
  handler: Function
  type?: 'base' | 'secondary'
}

export function Button({ 
  value,
  handler,
  type = 'base',
}: Props) {
  const [color, setColor] = useState('secondary.700')

  useEffect(() => {
    if (type === 'secondary') {
      setColor('secondary.500')
    }
  }, [])

  return (
    <ChakraButton
      bg="white"
      border="1px"
      borderColor="secondary.200"
      borderRadius="6px"
      fontSize="12px"
      lineHeight="20px"
      w="100px"
      h="32px"
      pl="0"
      textAlign="start"
      color={color}
      onClick={() => handler()}
    >
      { value }
    </ChakraButton>
  )
}

