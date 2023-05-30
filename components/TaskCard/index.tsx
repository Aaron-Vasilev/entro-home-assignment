import Image from 'next/image'
import { Box, Flex } from '@chakra-ui/react'
import { Task } from '@prisma/client'
import { Button } from '../Button'
import { TaskInfo } from '../TaskInfo'

interface Props {
  task: Task
  clickOnTask: Function
}

export function TaskCard({ task, clickOnTask }: Props) {

  function handleClick() {
    clickOnTask(task)
  }

  return (
    <Box 
      overflow="hidden" 
      borderWidth="1px"
      borderColor="secondary.100"
      borderRadius="10px"
      px="32px"
      py="28px"
      boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
      _hover={{
        transitionDuration: "0.25s",
        transitionTimingFunction: "ease-in-out",
        boxShadow: `0px 12px 16px -4px rgba(16, 24, 40, 0.08), 
                    0px 4px 6px -2px rgba(16, 24, 40, 0.03)`,
      }}
      onClick={handleClick}
    >
      <Flex
        justifyContent="space-between"
      >
        <TaskInfo
          task={task}
        />
        <Flex
          alignItems="center"
          borderLeft="1px solid"
          borderLeftColor="rgba(223, 227, 235, 0.4)"
          pl="32px"
          gap="25px"
        >
          <Button
            value={task.status}
            handler={() => {}}
          />
          <Image
            src="/arrowLeft.svg" alt="left arrow" width={6} height={12}
          />
        </Flex>
      </Flex>
    </Box>
  )
}

