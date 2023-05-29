import { useEffect } from 'react'
import { VStack } from '@chakra-ui/react'
import { Task } from '@prisma/client'
import { TaskList } from '../components/TaskList'
import { call } from '../lib/axios'
import { Api } from '../utils/consts'
import { useAppDispatch } from '../store'
import { addTasks } from '../store/slices/taskSlice'

interface Props {
  tasks: Task[]
}

export default function HomePage({ tasks }: Props) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(addTasks(tasks))
  }, [tasks])

  return (
    <VStack 
      spacing={5}
      align="stretch"
    >
      <TaskList 
        tasks={tasks}
      />
    </VStack>
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

