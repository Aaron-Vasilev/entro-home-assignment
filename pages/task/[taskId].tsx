import { Box, Heading, Text } from '@chakra-ui/react'
import { Task, TaskRelation } from '@prisma/client'
import { TaskInfo } from '../../components/TaskInfo'
import { TaskDetail } from '../../components/TaskDetail'
import { call } from '../../lib/axios'
import { Api } from '../../utils/consts'
import { RelatedWatchers } from '../../components/RelatedWatchers'

interface Props {
  task: Task
  relatedTasks: TaskRelation[]
}

export default function TaskPage({ task, relatedTasks }: Props) {

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
        <RelatedWatchers 
          relatedTasks={relatedTasks}
          watchers={[]}
        />
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context) {
  try {
    const { taskId } = context.query
    const [taskCall, taskRelationCall] = await Promise.all([
      call<Task[]>(Api.getTaskById, { taskId }),
      call<TaskRelation>(Api.getTaskRelation, { taskId })
    ])

    return {
      props: {
        task: taskCall.data,
        relatedTasks: taskRelationCall.data
      }
    }
  } catch(e) {
    console.error('† line 35 e', e)
  }
}

