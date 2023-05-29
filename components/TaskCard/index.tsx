import Link from 'next/link'
import { Box, Image, Text } from '@chakra-ui/react'
import { Task } from '../../utils/types'

interface Props {
  task: Task
}

export function TaskCard({ task }: Props) {
  return (
    <Link href={`/tasks/${task.id}`}>
      <Box borderWidth={1} borderRadius="lg" overflow="hidden" p={4}>
        <Text fontWeight="bold">{task.title}</Text>
        <Box display="flex" alignItems="center" mt={2}>
          {/* TODO Replace this with the actual avatar URL */}
          <Image src="https://via.placeholder.com/40" borderRadius="full" boxSize={8} />
          <Text ml={2}>{task.assigneeName}</Text>
        </Box>
        <Text mt={2}>Status: {task.status}</Text>
        <Text mt={2}>Created at: {task.creationDate}</Text>
        <Text mt={2}>{task.description}</Text>
        {/* TODO We'll add related tasks and watchers here later */}
      </Box>
    </Link>
  )
}

