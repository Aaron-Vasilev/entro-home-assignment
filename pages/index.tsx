import { Box, Heading, VStack } from '@chakra-ui/react'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'

const HomePage = () => {
  return (
    <Box>
      <Heading mb={5}>Task Manager</Heading>
      <VStack spacing={5}>
        <TaskForm />
        <TaskList />
      </VStack>
    </Box>
  )
}

export default HomePage
