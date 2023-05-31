import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { Task } from '../../prisma/generated'

interface Props {
  task: Task
}

export function TaskInfo({ task }: Props) {

  function cardInfo(): string {
    return `${task.assigneeName} · ${task.creationDate}`
  }

  return (
    <Flex
      gap="24px"
    >
      Image
      <Box>
        <Heading
          size="14px"
          mb="8px"
        >
          {task.title}
        </Heading>
        <Text
          textColor="secondary.500"
        >
          {cardInfo()}
        </Text>
      </Box>
    </Flex>
  )
}
