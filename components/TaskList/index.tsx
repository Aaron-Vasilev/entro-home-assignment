import { Flex } from "@chakra-ui/react"
import { Task } from '@prisma/client'
import { TaskCard } from "../TaskCard"

interface Props {
  tasks: Task[]
}

export function TaskList({ tasks }: Props) {
  return (
    <>
      <Flex
        gap="16px"
        flexDirection="column"
      >
        {tasks.map(task =>  <TaskCard key={task.id} task={task} />)}
      </Flex>
    </>
  )
}

