import { Box, Flex, FormControl, Text, Input, Select, Textarea } from "@chakra-ui/react"
import { Task } from '@prisma/client'
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { createTask, pushRelatedTask } from "../../store/slices/taskSlice"
import { Button } from '../Button'
import { useAppDispatch } from "../../store"
import { currentTime } from "../../lib"
import { RelatedWatchers } from "../RelatedWatchers"

enum Form {
  title = 'title',
  description = 'description',
  assigneeName = 'assigneeName',
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
    control,
    formState: {
      errors 
    }, 
  } = useForm()

  async function onSubmit (newTask: Task) {
    newTask.status = 'Open'
    newTask.creationDate = time
    console.log('† line 38 newTask', newTask)
    const result = await dispatch(createTask(newTask))

    if (result.meta.requestStatus === 'fulfilled') {
      setCreation(false)
    }
  }

  async function nextStep() {
    const valid = await trigger('title')
    if (valid) {
      setStep(2)
    }
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
                isDisabled={step === 2}
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
            ml="auto"
          >
            <FormControl 
              alignSelf="center"
              isInvalid={!!errors[Form.assigneeName]}
            >
              <Controller
                name="assigneeName"
                control={control}
                defaultValue="Unassigned"
                rules={{ required: "This is required" }}
                render={({ field }) => 
                  <Flex
                    gap="8px"
                    alignItems="center"
                  >
                    <Text 
                      whiteSpace="nowrap"
                      textColor="secondary.500"
                    >
                      Assign to
                    </Text>
                    <Select
                      border="none"
                      id={Form.assigneeName}
                      _focusVisible={{ outline: "none" }} 
                      {...field} 
                    >
                      <option value="Unassigned">Unassigned</option>
                      <option value="Beth">Beth</option>
                      <option value="Dave">Dave</option>
                      <option value="Emily">Emily</option>
                    </Select>
                  </Flex>
                }
              />
            </FormControl>
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
              submit
              alignTextCenter
              handler={() => {}}
            />
          </Flex>
        )}
        { step === 2 && (
          <Box>
            <FormControl
              p="16px"
              isInvalid={!!errors[Form.description]}
            >
              <Text
                textColor="secondary.500"
                fontSize="12px"
                mb="8px"
              >
                Description
              </Text>
              <Textarea 
                fontSize="16px"
                backgroundColor="primary.200"
                p="12px"
                border="none"
                fontWeight="bold"
                outline="none"
                resize="none"
                _focusVisible={{ outline: "none" }} 
                placeholder="Description"
                id={Form.description}
                {...register(Form.description, {
                  required: true
                })}
              />
            </FormControl>
            <RelatedWatchers clickOnTask={() => console.log(1000)} linkTask={pushRelatedTask}/>
            <Flex
              gap="8px"
              justifyContent="flex-end"
            >
              <Button 
                value="Back"
                handler={() => setStep(1)}
              />
              <Button 
                value="Finish"
                submit
                type="primary"
                alignTextCenter
                handler={() => {}}
              />
            </Flex>
          </Box>
        )}
      </form>
    </Box>
  )
}
