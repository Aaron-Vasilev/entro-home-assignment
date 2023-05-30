import { Box, Button, Flex, Heading } from "@chakra-ui/react"
import { Task } from '@prisma/client'
import { useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { TaskList } from "../TaskList"
import { LinkTask } from "../LinkTask"
import { RootState } from "../../store"

type Tab = 'R' | 'W'

export function RelatedWatchers() {
  const relatedTasks = useSelector((state: RootState) => state.tasks.relatedTasks)
  const [currentTab, setCurrentTab] = useState('R')
  const router = useRouter()
  const clickOnTask = (task: Task) => { }
  const isActive = (tab: Tab): boolean => currentTab === tab

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
      {currentTab === 'R' ? < TaskList tasks={relatedTasks} clickOnTask={clickOnTask}/> : 'Watchers'}
      <LinkTask />
    </Box>
  )
}
