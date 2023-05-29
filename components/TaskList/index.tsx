import { Box, VStack, Heading, Text } from "@chakra-ui/react"
import { Task } from '@prisma/client'
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { TaskCard } from "../TaskCard"

interface Props {
  tasks: Task[]
}

export function TaskList({ tasks }: Props) {

  return (
      <Box>
        {tasks.map(task =>  <TaskCard key={task.id} task={task} />)}
      </Box>
  )
}

