import { Box, VStack, Heading, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { TaskCard } from "../TaskCard"

export function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks)

  return (
      <Box>
        {tasks.map(task =>  <TaskCard key={task.id} task={task} />)}
      </Box>
  )
}

