import { Box, Flex, Heading } from "@chakra-ui/react";
import { Task } from '@prisma/client'
import { useState } from "react";
import { TaskList } from "../TaskList";

interface Props {
  relatedTasks: Task[]
  watchers: []
}

type Tab = 'R' | 'W'

export function RelatedWatchers({ relatedTasks }: Props) {
  const [currentTab, setCurrentTab] = useState('R')

  function isActive(tab: Tab): boolean {
    return currentTab === tab
  }

  return (
    <Box>
      <Flex
        gap="40px"
        pl="14px"
      >
        <Heading
          pb="18px"
          px="2px"
          fontSize="14px"
          borderColor="black"
          borderBottom={isActive('R') && "2px solid"}
          onClick={() => setCurrentTab('R')}
        >
          Related tasks
        </Heading>
        <Heading
          pb="18px"
          fontSize="14px"
          borderColor="black"
          borderBottom={isActive('W') && "2px solid"}
          onClick={() => setCurrentTab('W')}
        >
          Watchers
        </Heading>
      </Flex>
      {currentTab === 'R' ? < TaskList tasks={relatedTasks}/> : 'Watchers'}
    </Box>
  )
}
