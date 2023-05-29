import { useSelector } from 'react-redux'
import { Box, Heading, Text } from '@chakra-ui/react'
import { RootState } from '../../store'

interface Props {
  taskId: string
}

export function TaskDetail({ taskId }: Props) {
  console.log('† line 9 taskId', taskId)
  const task = useSelector((state: RootState) => 
    state.tasks.tasks.find(task => task.id === +taskId)
  )

  console.log('† line 15 task', task)
  if (task === undefined) {
    return <Text>No task found</Text>
  }

  return (
    <Box>
      <Heading mb={4}>{task.title}</Heading>
      <Text>Assigned to: {task.assigneeName}</Text>
    </Box>
  )
}
