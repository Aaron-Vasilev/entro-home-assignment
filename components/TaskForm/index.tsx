import { Box, Flex, FormControl, Text, Input } from "@chakra-ui/react"
import { Task } from '@prisma/client'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { createTask } from "../../store/slices/taskSlice"
import { Button } from '../Button'
import { useAppDispatch } from "../../store"
import { currentTime } from "../../lib"
import { RelatedWatchers } from "../RelatedWatchers"

enum Form {
  title = 'title',
} 

interface Props {
  setCreation: Function
}

export function TaskForm({ setCreation }: Props) {
  const dispatch = useAppDispatch()
  const [step, setStep] = useState(1)
  const [time, _setTime] = useState(currentTime())
  const {
    register, 
    handleSubmit, 
    trigger,
    formState: {
      errors 
    }, 
  } = useForm()

  async function onSubmit (newTask: Task) {
    newTask.assigneeName = 'Aaron'
    newTask.status = 'Open'
    newTask.creationDate = time
    const result = await dispatch(createTask(newTask))

    if (result.meta.requestStatus === 'fulfilled') {
      setCreation(false)
    }
  }


  async function nextStep() {
    trigger('title')
    setStep(2)
  }

  return (
    <Box
      px="32px"
      py="24px"
      bg="secondary.50"
      borderRadius="6px"
      boxShadow="0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);"
    >
      <form 
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex
          gap="24px"
          borderBottom="1px solid"
          borderBottomColor="rgba(152, 162, 179, 0.4)"
          mb="24px"
          pb="24px"
        >
          Image
          <Box>
            <FormControl
              isInvalid={!!errors[Form.title]}
            >
              <Input 
                fontSize="16px"
                pl="0"
                border="none"
                fontWeight="bold"
                outline="none"
                _focusVisible={{ outline: "none" }} 
                placeholder="Task Title"
                id={Form.title}
                {...register(Form.title, {
                  required: true
                })}
              />
            </FormControl>
            <Text
              textColor="secondary.500"
            >
              {currentTime()}
            </Text>
          </Box>
          <Box
            alignSelf="center"
            justifySelf="flex-end"
          >
            Assign to
          </Box>
        </Flex>
        { step === 1 && (
          <Flex
            justifyContent="flex-end"
            gap="6px"
          >
            <Button 
              value="Next"
              handler={nextStep}
              type="primary"
              alignTextCenter
            />
            <Button 
              value="Finish"
              handler={() => {}}
              submit
              alignTextCenter
            />
          </Flex>
        )}
        { step === 2 && (
          <Box>
            <RelatedWatchers />
          </Box>
        )}
      </form>
    </Box>
  )
}
