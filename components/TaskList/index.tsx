import { Flex } from "@chakra-ui/react"
import { Task } from '../../prisma/generated'
import { TaskCard } from "../TaskCard"

interface Props {
  tasks: Task[]
  clickOnTask: Function
}

export function TaskList({ tasks, clickOnTask }: Props) {
  return (
    <>
      <Flex
        gap="16px"
        flexDirection="column"
      >
        {tasks.map(task =>  <TaskCard key={task.id} task={task} clickOnTask={clickOnTask} />)}
      </Flex>
    </>
  )
}

