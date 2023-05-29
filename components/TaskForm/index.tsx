import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { Task } from '@prisma/client'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { createTask } from "../../store/slices/taskSlice"
import { useAppDispatch } from "../../store"

export function TaskForm() {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, formState: { errors }, trigger } = useForm()
  const [step, setStep] = useState(1)

  async function onSubmit (newTask: Task) {
    await dispatch(createTask(newTask))
  }

  // TODO: Add creation date
  function next() {
    console.log(errors)
    trigger('title')
//    setStep(2)
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <>
            <FormControl
              isInvalid={!!errors.title}
            >
              <FormLabel>
                Title
              </FormLabel>
              <Input 
                id="title"
                {...register('title', {
                  required: true
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Assignee name</FormLabel>
              <Input {...register('assignee')} />
            </FormControl>
            <Button onClick={() => next()}>Next</Button>
          </>
        )}
        {step === 2 && (
          <>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Input {...register('status')} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input {...register('description')} />
            </FormControl>
            <Button onClick={() => setStep(1)}>Back</Button>
            <Button type="submit">Submit</Button>
          </>
        )}
      </form>
    </Box>
  )
}
