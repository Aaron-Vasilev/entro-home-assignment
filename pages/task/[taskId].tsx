import { Flex, Box, Heading, Text } from '@chakra-ui/react'
import { Task, TaskRelation } from '@prisma/client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { TaskInfo } from '../../components/TaskInfo'
import { TaskDetail } from '../../components/TaskDetail'
import { call } from '../../lib/axios'
import { Api } from '../../utils/consts'
import { RelatedWatchers } from '../../components/RelatedWatchers'
import { setActiveTask, addRelatedTask, setRelatedTasks, setTasks } from '../../store/slices/taskSlice'
import { useAppDispatch } from '../../store'
import { Button } from '../../components/Button'

interface Props {
  activeTask: Task
  tasks: Task[]
  relatedTasks: Task[]
}

export default function TaskPage({ activeTask, tasks, relatedTasks }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const goHome = () => { router.push('/') }
  const clickOnTask = (task: Task) => { router.push(task.id.toString()) }

  useEffect(() => {
    dispatch(setActiveTask(activeTask))
    dispatch(setTasks(tasks))
    dispatch(setRelatedTasks(relatedTasks))
  }, [activeTask])

  return (
    <>
      <Flex
        gap="20px"
        align="center"
        mb="20px"
      >
        <Heading
          fontSize="22"
        >
          Tasks
        </Heading>
        <Button
          value='Home'
          handler={goHome}
          type='secondary'
          alignTextCenter
        />
      </Flex>
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
          task={activeTask}
        />
      </Box>
      <TaskDetail
        task={activeTask}
      />
      <Box
        mt="74px"
      >
        <RelatedWatchers clickOnTask={clickOnTask} linkTask={addRelatedTask}/>
      </Box>
    </Box>
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const { taskId } = context.query
    const [
      activeTaskCall, 
      taskRelationCall,
      tasksCall
    ] = await Promise.all([
      call<Task>(Api.getTaskById, { taskId }),
      call<TaskRelation>(Api.getTaskRelation, { taskId }),
      call<Task[]>(Api.getTasks)
    ])

    return {
      props: {
        activeTask: activeTaskCall.data,
        relatedTasks: taskRelationCall.data,
        tasks: tasksCall.data
      }
    }
  } catch(e) {
    console.error('† line 35 e', e)
  }
}

