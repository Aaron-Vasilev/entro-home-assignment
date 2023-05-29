import { Box, Heading, VStack } from '@chakra-ui/react'
import { Task } from '@prisma/client'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { call } from '../lib/axios'
import { Api } from '../utils/consts'

interface Props {
  tasks: Task[]
}

export default function HomePage({ tasks }: Props) {
  return (
    <Box>
      <Heading mb={5}>Task Manager</Heading>
      <VStack spacing={5}>
        <TaskForm />
        <TaskList 
          tasks={tasks}
        />
      </VStack>
    </Box>
  )
}

export async function getServerSideProps() {
  try {
    const res = await call<Task[]>(Api.getTasks)

    return {
      props: {
        tasks: res.data
      }
    }
  } catch(e) {
    console.error('† line 35 e', e)
  }
}

