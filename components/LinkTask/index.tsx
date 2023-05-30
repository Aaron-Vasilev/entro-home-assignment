import { Button, Box, Heading, Input } from "@chakra-ui/react"
import { Task } from '@prisma/client'
import { useSelector } from "react-redux"
import Image from "next/image"
import { RootState, useAppDispatch } from "../../store"
import { useState } from "react"
import { TaskList } from "../TaskList"
import { isActiveTask, taskIsInRelatedTasks } from "../../lib"
import { setRelatedTasks } from "../../store/slices/taskSlice"

interface Props {
  linkTask: Function
}

export function LinkTask({ linkTask }) {
  const dispatch = useAppDispatch()
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  const relatedTasks = useSelector((state: RootState) => state.tasks.relatedTasks)
  const activeTask = useSelector((state: RootState) => state.tasks.activeTask)
  const [searchTasks, setSearchTasks] = useState<Task[]>([])
  const [inputIsShown, setInputIsShown] = useState(false)
  const [searchWord, setSearchWord] = useState('')

  function handleInput(e: any) {
    const value = e.target.value
    setSearchWord(value)
  
    if (value === '')
      return

    const searchingTasks = tasks.filter(task => (
      !isActiveTask(activeTask, task) && 
      !taskIsInRelatedTasks(relatedTasks, task) &&
       task.title.includes(value)
    ))

    setSearchTasks(searchingTasks)
  }

  function hide() {
    setInputIsShown(false)
    setSearchTasks([])
  }

  async function handleClick (task: Task) {
    const result = await dispatch(linkTask(task))

    if (result.meta.requestStatus === 'fulfilled') {
      setInputIsShown(false)
      setSearchWord('')
    }
  }

  if (inputIsShown) {
    return (
      <Box
        py="27px"
      >
        <Input 
          onChange={handleInput}
        />
        { searchWord.length > 0 &&
          <TaskList 
            tasks={searchTasks}
            clickOnTask={handleClick}
          />
        }
        <Button
          mt="12px"
          bg="none"
          onClick={hide}
        >
          <Heading
            fontSize="md"
            display="flex"
            gap="11px"
          >
            Hide
          </Heading>
        </Button>
      </Box>
    )
  }

  return (
      <Box
        py="27px"
      >
        <Button
          bg="none"
          onClick={() => setInputIsShown(true)}
        >
          <Heading
            fontSize="md"
            display="flex"
            gap="11px"
          >
            <Image
              src="/cross.svg" alt="left arrow" width={14} height={14}
            />
            Link to other tasks
          </Heading>
        </Button>
      </Box>
  )
}
