import { Box, VStack, Heading, Text, Flex } from "@chakra-ui/react"
import { Task } from '@prisma/client'
import { TaskCard } from "../TaskCard"
import { Button } from "../Button"

interface Props {
  tasks: Task[]
}

export function TaskList({ tasks }: Props) {

  function newTaskHandler() {
    console.log('† line 12 function')
  }

  return (
    <>
      <Flex
        gap="20px"
        align="center"
      >
        <Heading
          fontSize="22"
        >
          Tasks
        </Heading>
        <Button
          value="New task"
          handler={newTaskHandler}
          type="secondary"
        />
      </Flex>
      <Box>
        {tasks.map(task =>  <TaskCard key={task.id} task={task} />)}
      </Box>
    </>
  )
}

