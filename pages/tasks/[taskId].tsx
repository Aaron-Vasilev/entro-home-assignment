import { useRouter } from 'next/router'
import { TaskDetail } from '../../components/TaskDetail'

function TaskPage() {
  const router = useRouter()
  const { taskId } = router.query

  //@ts-ignore
  return <TaskDetail taskId={taskId} />
}

export default TaskPage
