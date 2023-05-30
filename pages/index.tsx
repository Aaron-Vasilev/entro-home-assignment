import { useEffect, useState } from 'react'
import { VStack } from '@chakra-ui/react'
import { Task } from '@prisma/client'
import { TaskList } from '../components/TaskList'
import { call } from '../lib/axios'
import { Api } from '../utils/consts'
import { useAppDispatch, RootState } from '../store'
import { addTasks } from '../store/slices/taskSlice'
import { TaskForm } from '../components/TaskForm'
import { Header } from '../components/MainPageHead'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

interface Props {
  initialTasks: Task[]
}

export default function HomePage({ initialTasks }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [creation, setCreation] = useState(false)
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  const clickOnTask = (task: Task) => router.push(`task/${task.id}`)

  useEffect(() => {
    dispatch(addTasks(initialTasks))
  }, [initialTasks])

  return (
    <VStack 
      spacing={5}
      align="stretch"
    >
      <Header 
        creation={creation}
        setCreation={setCreation}
      />
      { creation && <TaskForm setCreation={setCreation} /> }
      <TaskList 
        tasks={tasks}
        clickOnTask={clickOnTask}
      />
    </VStack>
  )
}

export async function getServerSideProps() {
  try {
    const res = await call<Task[]>(Api.getTasks)

    return {
      props: {
        initialTasks: res.data
      }
    }
  } catch(e) {
    console.error('† line 35 e', e)
  }
}

