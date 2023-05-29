import { Box, Heading, Text } from '@chakra-ui/react'
import { Task } from '@prisma/client'
import { TaskInfo } from '../../components/TaskInfo'
import { TaskDetail } from '../../components/TaskDetail'
import { call } from '../../lib/axios'
import { Api } from '../../utils/consts'

interface Props {
  task: Task
}

export default function TaskPage({ task }: Props) {

  if (task === undefined) {
    return <Text>No task found</Text>
  }

  return (
    <Box
      py="32px"
      px="28px"
      bg="secondary.50"
    >
      <Box
        borderBottom="1px solid"
        borderBottomColor="rgba(152, 162, 179, 0.4)"
        pb="24px"
      >
        <TaskInfo
          task={task}
        />
      </Box>
      <TaskDetail
        task={task}
      />
      <Box
        mt="74px"
      >
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context) {
  try {
    const { taskId } = context.query
    const res = await call<Task[]>(Api.getTaskById, { taskId })

    return {
      props: {
        task: res.data
      }
    }
  } catch(e) {
    console.error('† line 35 e', e)
  }
}

