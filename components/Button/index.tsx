import { useEffect, useState } from "react"
import { Button as ChakraButton } from "@chakra-ui/react"

interface Props {
  value: string
  handler: Function
  type?: 'base' | 'primary' | 'secondary'
  submit?: boolean
  alignTextCenter?: boolean
}

export function Button({ 
  value,
  handler,
  type = 'base',
  submit,
  alignTextCenter = false
}: Props) {
  const [color, setColor] = useState('secondary.700')
  const [bgColor, setBgColor] = useState('white')

  useEffect(() => {
    switch (type) {
      case 'secondary':
        setColor('secondary.500')
        setBgColor('white')
        break;
      case 'primary':
        setColor('white')
        setBgColor('primary.1000')
        break;
    }
  }, [])

  return (
    <ChakraButton
      bg={bgColor}
      border="1px"
      borderColor="secondary.200"
      borderRadius="6px"
      fontSize="12px"
      lineHeight="20px"
      w="100px"
      h="32px"
      pl="0"
      textAlign={alignTextCenter ? 'center' : 'start'}
      color={color}
      onClick={() => handler()}
      type={submit ? 'submit' : 'button'}
    >
      { value }
    </ChakraButton>
  )
}

